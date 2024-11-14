import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const reports = pgTable("report", {
  id: integer("id").primaryKey(),
  title: text("name"),
});
