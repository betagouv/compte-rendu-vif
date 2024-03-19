import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { ENV } from "../envVars";
// for migrations
const connectionStr = `postgres://${ENV.POSTGRES_USER}:${ENV.POSTGRES_PASSWORD}@${ENV.POSTGRES_HOST}:${ENV.POSTGRES_PORT}/${ENV.POSTGRES_DB}`;

const migrationClient = postgres(connectionStr, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" });
// for query purposes
const queryClient = postgres(connectionStr);
const db = drizzle(queryClient);
