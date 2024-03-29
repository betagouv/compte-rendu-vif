import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { ENV } from "../envVars";

const sqlite = new Database(ENV.USERS_DATABASE_URL);
export const db = drizzle(sqlite);
