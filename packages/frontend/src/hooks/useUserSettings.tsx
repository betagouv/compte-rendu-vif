import { useUser } from "../contexts/AuthContext";
import { db, useDbQuery } from "../db/db";

export const useUserSettings = () => {
  const user = useUser()!;

  const userSettingsQuery = useDbQuery(db.selectFrom("user_settings").where("user_id", "=", user.id).selectAll());
  const isLoading = userSettingsQuery.isLoading;

  const userSettings = userSettingsQuery.data?.[0] ?? {
    default_emails: user.udap?.email || "",
  };

  const existing = userSettingsQuery.data?.length > 0;

  return {
    userSettings,
    isLoading,
    existing,
  };
};
