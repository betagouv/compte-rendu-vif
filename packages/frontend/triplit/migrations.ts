import migration1 from "./migrations/1711533152295_sync_with_remote.json";
import migration2 from "./migrations/1711533285068_sync_with_remote.json";

import type { Migration } from "@triplit/db";

export const migrations = [migration1, migration2] as Migration[];
