import type { Config } from "drizzle-kit";
import { ENV } from "./src/envVars";

export const config = {
  port: ENV.POSTGRES_PORT,
  host: ENV.POSTGRES_HOST,
  user: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.POSTGRES_DB,
};

export const usersDatabaseUrl = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: config,
} satisfies Config;
