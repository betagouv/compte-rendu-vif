import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { execSync } from "child_process";

dotenvExpand.expand(dotenv.config());

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const command = `pnpm pg-migrations apply --database "${databaseUrl}" --ignore-error migration_file_edited --directory ./db/migrations`;

try {
  execSync(command, { stdio: "inherit" });
} catch (e) {
  console.error("Migration failed:", e);
  process.exit(1);
}
