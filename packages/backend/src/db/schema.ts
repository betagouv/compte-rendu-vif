import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  temporaryLink: text("temporaryLink"),
  temporaryLinkExpiresAt: text("temporaryLinkExpiresAt"),
  password: text("password").notNull(),
});

export const delegationTable = pgTable(
  "delegations",
  {
    createdBy: text("createdBy").notNull(),
    delegatedTo: text("delegatedTo").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.createdBy, table.delegatedTo] }),
    };
  },
);

export const delegationsRelation = relations(delegationTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [delegationTable.createdBy],
    references: [userTable.id],
  }),
  delegatedTo: one(userTable, {
    fields: [delegationTable.delegatedTo],
    references: [userTable.id],
  }),
}));
