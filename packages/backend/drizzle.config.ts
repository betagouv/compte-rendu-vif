import type { Config } from "drizzle-kit";
import { ENV } from "./src/envVars";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: ENV.POSTGRES_HOST,
    port: ENV.POSTGRES_PORT,
    user: ENV.POSTGRES_USER,
    database: ENV.POSTGRES_DB,
  },
} satisfies Config;
