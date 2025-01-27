import { ENV } from "../envVars";
import { DB } from "../db-types";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString: ENV.DATABASE_URL,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
