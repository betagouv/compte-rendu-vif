import migration1 from "./migrations/1711037022568_1.json";
import migration2 from "./migrations/1711037288919_2.json";
import type { Migration } from "@triplit/db";

export const migrations: Migration[] = [migration1, migration2];
