import type { Config } from "drizzle-kit";
import { ENV } from "./src/envVars";

export const config = {
  port: ENV.PG_PORT,
  host: ENV.PG_HOST,
  user: ENV.PG_USER,
  password: ENV.PG_PASSWORD,
  database: ENV.PG_USERS_DB,
};

export const usersDatabaseUrl = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: config,
} satisfies Config;
