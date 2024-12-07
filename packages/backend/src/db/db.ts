import { ENV } from "../envVars";
import { DB } from "../db-types"; // this is the Database interface we defined earlier
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new pg.Pool({
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
