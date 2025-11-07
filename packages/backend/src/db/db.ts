import { ENV, isDev } from "../envVars";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Kyselify } from "drizzle-orm/kysely";

import * as tables from "./schema";

const pool = new pg.Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: false,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<Database>({
  dialect,
});

export type Database = {
  user: Kyselify<typeof tables.user>;
  internal_user: Kyselify<typeof tables.internalUser>;
  delegation: Kyselify<typeof tables.delegation>;
  service_instructeurs: Kyselify<typeof tables.serviceInstructeurs>;
  whitelist: Kyselify<typeof tables.whitelist>;
  service: Kyselify<typeof tables.service>;
  clause_v2: Kyselify<typeof tables.clauseV2>;
  report: Kyselify<typeof tables.report>;
  pdf_snapshot: Kyselify<typeof tables.pdfSnapshot>;
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
  visited_section: Kyselify<typeof tables.visitedSection>;
};
