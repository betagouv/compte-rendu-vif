import type { Config } from "drizzle-kit";
import { ENV } from "./src/envVars";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: ENV.USERS_DATABASE_URL,
  },
} satisfies Config;
