import { db } from "../../db/db";

export type UpCacheEntry = { key: string; payload: string | null; fetchedAt: string };

/** Storage for raw dataspace responses; the up_cache table in production, a Map in unit tests. */
export interface UpCache {
  get(keys: string[]): Promise<UpCacheEntry[]>;
  set(entries: UpCacheEntry[]): Promise<void>;
}

export class PgUpCache implements UpCache {
  async get(keys: string[]) {
    if (!keys.length) return [];
    const rows = await db.selectFrom("up_cache").selectAll().where("key", "in", keys).execute();
    return rows.map((row) => ({ key: row.key, payload: row.payload, fetchedAt: row.fetched_at }));
  }

  async set(entries: UpCacheEntry[]) {
    if (!entries.length) return;
    await db
      .insertInto("up_cache")
      .values(entries.map((e) => ({ key: e.key, payload: e.payload, fetched_at: e.fetchedAt })))
      .onConflict((oc) =>
        oc.column("key").doUpdateSet((eb) => ({
          payload: eb.ref("excluded.payload"),
          fetched_at: eb.ref("excluded.fetched_at"),
        })),
      )
      .execute();
  }
}

export class MemoryUpCache implements UpCache {
  entries = new Map<string, UpCacheEntry>();

  async get(keys: string[]) {
    return keys.map((key) => this.entries.get(key)).filter((e): e is UpCacheEntry => !!e);
  }

  async set(entries: UpCacheEntry[]) {
    for (const entry of entries) this.entries.set(entry.key, entry);
  }
}
