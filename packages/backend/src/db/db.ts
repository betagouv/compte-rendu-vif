import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { ENV } from "../envVars";
import { onHmr } from "../hmr";
import { reports } from "./schema";

// const connection = postgres({
//   host: ENV.POSTGRES_HOST,
//   port: ENV.POSTGRES_PORT,
//   db: ENV.POSTGRES_DB,
//   user: ENV.POSTGRES_USER,
//   password: ENV.POSTGRES_PASSWORD,
// });

// export const db = drizzle(connection);
