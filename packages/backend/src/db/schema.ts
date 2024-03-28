import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  temporaryPassword: text("temporaryPassword"),
  temporaryPasswordExpiresAt: text("temporaryPasswordExpiresAt"),
  password: text("password").notNull(),
});
