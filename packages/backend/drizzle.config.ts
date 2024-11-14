import type { Config } from "drizzle-kit";
import { ENV, isDev } from "./src/envVars";

export const config = {
  port: ENV.POSTGRES_PORT,
  host: ENV.POSTGRES_HOST,
  user: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.POSTGRES_DB,
};

export const usersDatabaseUrl = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

export default {
  schema: "./schemas.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { ...config, ssl: false },
  migrations: {
    table: "migrations",
    schema: "public",
  },
} satisfies Config;
