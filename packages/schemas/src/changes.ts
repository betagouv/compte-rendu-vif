import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const changes = pgTable(
  "changes",
  {
    table: text("table"),
    attribute: text("id"),
    change: text("change"),
    date: text("date"),
    user: text("user"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.attribute, table.table] }),
    };
  },
);
