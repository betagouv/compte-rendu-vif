import { drizzle } from "drizzle-orm/postgres-js";
import { ENV } from "../envVars";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const migrationClient = postgres(ENV.USERS_DATABASE_URL, { max: 1 });
export const migrateUsersDb = () => migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });

const queryClient = postgres(ENV.USERS_DATABASE_URL);
export const db = drizzle(queryClient);
