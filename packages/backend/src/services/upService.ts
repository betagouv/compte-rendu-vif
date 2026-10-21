import { ENV } from "../envVars";
import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";
import { PgUpCache, type UpCache, type UpCacheEntry } from "../features/up/upCache";
import { normalizeUp, upFromEnfantSummary } from "../features/up/upNormalize";
import { makeUpProvider, type UpProvider } from "../features/up/upProvider";
import type { RawUpDocument, UnitePatrimoniale, UpTree } from "../features/up/upTypes";

const debug = makeDebug("up-service");

const byIntitule = (a: UnitePatrimoniale, b: UnitePatrimoniale) =>
  a.intitule.localeCompare(b.intitule, "fr", { sensitivity: "base" });

/** Safety limits against malformed data (cycles are already prevented by never fetching an id twice). */
const MAX_DEPTH = 10;
const MAX_UPS = 1000;

/**
 * Normalizes the fetched documents into a flat tree. Children listed in "enfants" without a document of their own
 * become leaves built from that summary; each UP's enfantsIds are sorted by name.
 */
const buildTree = (rootId: string, docs: Map<string, RawUpDocument>): UpTree => {
  const ups = new Map<string, UnitePatrimoniale>();
  const visit = (doc: RawUpDocument) => {
    const up = normalizeUp(doc);
    ups.set(up.id, up);
    const enfants: UnitePatrimoniale[] = [];
    for (const summary of doc.enfants ?? []) {
      const id = String(summary.epa_id);
      if (ups.has(id)) continue; // cycle or shared child: keep the first parent only
      const childDoc = docs.get(id);
      if (childDoc) enfants.push(visit(childDoc));
      else {
        const leaf = upFromEnfantSummary(summary, up);
        ups.set(leaf.id, leaf);
        enfants.push(leaf);
      }
    }
    up.enfantsIds = enfants.sort(byIntitule).map((e) => e.id);
    return up;
  };
  visit(docs.get(rootId)!);
  return { rootId, ups: [...ups.values()] };
};

const parsePayload = <T>(entry: UpCacheEntry): T | null => (entry.payload ? JSON.parse(entry.payload) : null);

/**
 * Unités patrimoniales of "MH complexes", read from the dataspace API.
 * The hierarchy only goes downwards (parent.enfants[].epa_id -> child _id).
 * Responses are cached, and a stale cache entry is served when the API is unreachable.
 */
export class UpService {
  constructor(
    private provider: UpProvider = makeUpProvider(),
    private cache: UpCache = new PgUpCache(),
    private ttlMs: number = ENV.UP_CACHE_TTL_HOURS * 3600 * 1000,
  ) {}

  /**
   * Whole UP hierarchy of a monument, or null when the monument is not split into UPs.
   * The API only links parents to children (enfants[].epa_id), so the tree is fetched breadth-first:
   * one query for the root (by Mérimée reference), then one `$in` query per level.
   */
  async getMonumentTree(referenceMerimee: string): Promise<UpTree | null> {
    const roots = await this.cachedQuery(`ref:${referenceMerimee}`, async () => {
      const docs = await this.provider.findByReferenceMerimee(referenceMerimee);
      return docs.length ? docs : null;
    });

    if (!roots?.length) return null;
    if (roots.length > 1) debug(`${roots.length} root UPs for ${referenceMerimee}, using the first one`);

    const root = roots[0]!;
    if (!root.enfants?.length) return null;
    await this.write([{ key: `id:${root._id}`, value: root }]);

    const docs = new Map<string, RawUpDocument>([[String(root._id), root]]);
    let frontier = [root];
    for (let depth = 0; frontier.length && depth < MAX_DEPTH; depth++) {
      const childIds = [...new Set(frontier.flatMap((d) => (d.enfants ?? []).map((e) => String(e.epa_id))))].filter(
        (id) => !docs.has(id),
      );
      if (!childIds.length) break;
      if (docs.size + childIds.length > MAX_UPS) {
        debug(`UP tree of ${referenceMerimee} truncated at ${docs.size} UPs`);
        break;
      }

      frontier = await this.getDocuments(childIds);
      for (const doc of frontier) docs.set(String(doc._id), doc);
    }

    return buildTree(String(root._id), docs);
  }

  /** Raw documents by id: fresh cache entries first, then the missing ones in a single API query. */
  private async getDocuments(ids: string[]): Promise<RawUpDocument[]> {
    if (!ids.length) return [];

    const entries = new Map((await this.cache.get(ids.map((id) => `id:${id}`))).map((e) => [e.key, e]));
    const found = new Map<string, RawUpDocument | null>();
    const toFetch: string[] = [];

    for (const id of ids) {
      const entry = entries.get(`id:${id}`);
      if (entry && this.isFresh(entry)) found.set(id, parsePayload(entry));
      else toFetch.push(id);
    }

    if (toFetch.length) {
      try {
        const fetched = new Map((await this.provider.findByIds(toFetch)).map((d) => [String(d._id), d]));
        await this.write(toFetch.map((id) => ({ key: `id:${id}`, value: fetched.get(id) ?? null })));
        for (const id of toFetch) found.set(id, fetched.get(id) ?? null);
      } catch (error) {
        if (!toFetch.every((id) => entries.has(`id:${id}`))) throw this.unavailable(error);
        debug("UP API error, serving stale cache", error);
        for (const id of toFetch) found.set(id, parsePayload(entries.get(`id:${id}`)!));
      }
    }

    return ids.map((id) => found.get(id)).filter((doc): doc is RawUpDocument => !!doc);
  }

  private async cachedQuery<T>(key: string, fetcher: () => Promise<T | null>): Promise<T | null> {
    const [entry] = await this.cache.get([key]);
    if (entry && this.isFresh(entry)) return parsePayload<T>(entry);

    try {
      const value = await fetcher();
      await this.write([{ key, value }]);
      return value;
    } catch (error) {
      if (!entry) throw this.unavailable(error);
      debug("UP API error, serving stale cache for", key, error);
      return parsePayload<T>(entry);
    }
  }

  private write(values: { key: string; value: unknown }[]) {
    const fetchedAt = new Date().toISOString();
    return this.cache.set(
      values.map(({ key, value }) => ({ key, payload: value == null ? null : JSON.stringify(value), fetchedAt })),
    );
  }

  private isFresh(entry: UpCacheEntry) {
    return Date.now() - new Date(entry.fetchedAt).getTime() < this.ttlMs;
  }

  private unavailable(error: unknown) {
    console.error("UP API unavailable", error);
    return new AppError(502, "Le service des unités patrimoniales est indisponible");
  }
}
