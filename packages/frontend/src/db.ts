import { initElectric } from "./service-worker/electric";
const { electric, db } = await initElectric();

import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

const client = new PGlite();
const db2 = drizzle(client);

export { electric, db };
