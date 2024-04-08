import { drizzle } from "drizzle-orm/postgres-js";
import { ENV } from "../envVars";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { config } from "../../drizzle.config";

const migrationClient = postgres({ ...config, max: 1 });
export const migrateUsersDb = () => migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });

const queryClient = postgres(config);
export const db = drizzle(queryClient);

export const cleanUpDb = async () => {
  await queryClient.end();
  await migrationClient.end();
};
