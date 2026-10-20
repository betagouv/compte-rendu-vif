import { describe, expect, it, vi } from "vitest";
import { MemoryUpCache } from "../features/up/upCache";
import { decodeUpString } from "../features/up/upNormalize";
import { MockUpProvider, type UpProvider } from "../features/up/upProvider";
import { UpService } from "./upService";
import type { UpTree } from "../features/up/upTypes";

const makeService = (provider: UpProvider = new MockUpProvider()) => {
  const cache = new MemoryUpCache();
  return { service: new UpService(provider, cache, 3600_000), cache };
};

describe("decodeUpString", () => {
  it("decodes the literal escapes returned by the API", () => {
    expect(decodeUpString("Pavillon de Penthi\\u00E8vre")).toBe("Pavillon de Penthièvre");
    expect(decodeUpString('Logis ouest dit \\"des Tambourineurs\\"')).toBe('Logis ouest dit "des Tambourineurs"');
    expect(decodeUpString("remprts sud T.2\\/2")).toBe("remprts sud T.2/2");
  });
});

const byId = (tree: UpTree) => new Map(tree.ups.map((up) => [up.id, up]));
const childNames = (tree: UpTree, id: string) => byId(tree).get(id)!.enfantsIds.map((c) => byId(tree).get(c)!.intitule);

describe("UpService.getMonumentTree", () => {
  it("returns the whole hierarchy of a monument, children sorted by name", async () => {
    const { service } = makeService();
    const tree = (await service.getMonumentTree("PA00097503"))!;

    expect(tree.rootId).toBe("409540");
    expect(tree.ups).toHaveLength(15); // château + 5 UPs + 9 parties d'immeuble
    expect(childNames(tree, "409540")).toEqual([
      "Aile Charles VIII",
      "Aile Louis XII",
      "Chapelle Saint-Hubert",
      "Enceinte",
      "Sols et terrasses",
    ]);
    expect(childNames(tree, "493366")).toEqual([
      "Logis est",
      'Logis ouest dit "des Tambourineurs"',
      "Pavillon de Penthièvre",
    ]);
    expect(childNames(tree, "493371")).toHaveLength(6);
    expect(byId(tree).get("493382")?.niveau).toBe("partie d'immeuble");
  });

  it("fetches one level per API query", async () => {
    const mock = new MockUpProvider();
    const provider: UpProvider = {
      findByReferenceMerimee: vi.fn(mock.findByReferenceMerimee.bind(mock)),
      findByIds: vi.fn(mock.findByIds.bind(mock)),
    };
    const { service } = makeService(provider);

    await service.getMonumentTree("PA00097503");
    expect(provider.findByReferenceMerimee).toHaveBeenCalledTimes(1);
    expect(provider.findByIds).toHaveBeenCalledTimes(2); // UPs, then parties d'immeuble

    // second call: everything comes from the cache
    await service.getMonumentTree("PA00097503");
    expect(provider.findByReferenceMerimee).toHaveBeenCalledTimes(1);
    expect(provider.findByIds).toHaveBeenCalledTimes(2);
  });

  it("returns null for a monument without unités patrimoniales", async () => {
    const { service } = makeService();
    expect(await service.getMonumentTree("PA99999999")).toBeNull();
  });

  it("falls back to the parent's summary for children missing from the API", async () => {
    const { service } = makeService();
    const tree = (await service.getMonumentTree("PA00079952"))!;

    expect(tree.ups.filter((up) => up.id !== tree.rootId)).toEqual([
      expect.objectContaining({ id: "468701", intitule: "Église abbatiale (ancienne)", complete: false }),
      expect.objectContaining({ id: "466481", intitule: "Jardin", typeImmeuble: "parc et jardin", complete: false }),
    ]);
  });

  it("does not loop on cyclic data", async () => {
    const provider = new MockUpProvider([
      { _id: "a", UPI_REFERENCE_MERIMEE: "PA1", EPA_INTITULE: "A", enfants: [{ epa_id: "b" }] },
      { _id: "b", EPA_INTITULE: "B", enfants: [{ epa_id: "a" }, { epa_id: "c" }] },
      { _id: "c", EPA_INTITULE: "C", enfants: [{ epa_id: "b" }] },
    ]);
    const { service } = makeService(provider);
    const tree = (await service.getMonumentTree("PA1"))!;

    expect(tree.ups.map((up) => up.id)).toEqual(["a", "b", "c"]);
    expect(childNames(tree, "b")).toEqual(["C"]);
    expect(childNames(tree, "c")).toEqual([]);
  });

  it("serves stale cache when the API fails, and errors without cache", async () => {
    const failing: UpProvider = {
      findByReferenceMerimee: () => Promise.reject(new Error("network")),
      findByIds: () => Promise.reject(new Error("network")),
    };

    const { service: noCache } = makeService(failing);
    await expect(noCache.getMonumentTree("PA00097503")).rejects.toMatchObject({ status: 502 });

    const { service: warm, cache } = makeService();
    await warm.getMonumentTree("PA00097503");
    for (const entry of cache.entries.values()) entry.fetchedAt = "2000-01-01T00:00:00.000Z";

    const stale = new UpService(failing, cache, 3600_000);
    expect((await stale.getMonumentTree("PA00097503"))?.ups).toHaveLength(15);
  });
});
