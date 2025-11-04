import { ENV, isDev } from "../envVars";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Kyselify } from "drizzle-orm/kysely";

import * as tables from "./schema";

import { drizzle } from "drizzle-orm/node-postgres";
console.log(isDev);
const pool = new pg.Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: isDev ? false : { rejectUnauthorized: false },
});

const drizzleDb = drizzle({
  client: pool,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<Database>({
  dialect,
});

type Database = {
  user: Kyselify<typeof tables.user>;
  internalUser: Kyselify<typeof tables.internalUser>;
  delegation: Kyselify<typeof tables.delegation>;
  serviceInstructeurs: Kyselify<typeof tables.serviceInstructeurs>;
  whitelist: Kyselify<typeof tables.whitelist>;
  udap: Kyselify<typeof tables.udap>;
  clauseV2: Kyselify<typeof tables.clauseV2>;
  report: Kyselify<typeof tables.report>;
  pdfSnapshot: Kyselify<typeof tables.pdfSnapshot>;
  tmp_pictures: Kyselify<typeof tables.tmpPictures>;
  picture_lines: Kyselify<typeof tables.pictureLines>;
  pictures: Kyselify<typeof tables.pictures>;
  transactions: Kyselify<typeof tables.transactions>;
  sent_email: Kyselify<typeof tables.sentEmail>;
  suggested_email: Kyselify<typeof tables.suggestedEmail>;
  user_settings: Kyselify<typeof tables.userSettings>;
  merimee: Kyselify<typeof tables.merimee>;
  pop_immeubles: Kyselify<typeof tables.popImmeubles>;
  state_report: Kyselify<typeof tables.stateReport>;
  user_dept: Kyselify<typeof tables.userDept>;
  merimee_to_memoire: Kyselify<typeof tables.merimeeToMemoire>;
};
