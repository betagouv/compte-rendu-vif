import { PrismaClient } from "@cr-vif/electric-client/backend";
import { ENV } from "../envVars";

// export const db = new PrismaClient({ datasources: { db: { url: ENV.DATABASE_URL } } });

// export const cleanUpDb = async () => {
//   await db.$disconnect();
// };

import { DB } from "../db-types"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: ENV.DATABASE_URL,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
