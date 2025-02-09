import { User } from "../db/AppSchema";
import { db } from "../db/db";

export const getUserSettings = async (user: User) => {
  const userSettings = await db
    .selectFrom("user_settings")
    .where("user_id", "=", user.id)
    .selectAll()
    .executeTakeFirst();

  if (userSettings) return userSettings;

  const udap = await db.selectFrom("udap").where("id", "=", user.udap_id).selectAll().executeTakeFirst();

  return {
    user_id: user.id,
    default_emails: udap?.email ?? "",
  };
};
