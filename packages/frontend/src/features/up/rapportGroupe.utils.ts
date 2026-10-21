import type { UpTree } from "./upApi";

/** Whether any selectable part of the monument remains free for another constat of the rapport. */
export const hasUpLeftForRapport = (tree: UpTree, excluded: Set<string | null>) =>
  !excluded.has(null) || tree.ups.some((up) => up.id !== tree.rootId && !excluded.has(up.id));
