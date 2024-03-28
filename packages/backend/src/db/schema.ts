import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  temporaryLink: text("temporaryLink"),
  temporaryLinkExpiresAt: text("temporaryLinkExpiresAt"),
  password: text("password").notNull(),
});
