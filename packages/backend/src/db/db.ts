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

export const migrateDb = async () => {
  const migrationConnection = postgres({
    host: ENV.POSTGRES_HOST,
    port: ENV.PG_PROXY_PORT,
    db: ENV.POSTGRES_DB,
    user: "electric",
    password: ENV.PG_PROXY_PASSWORD,
  });

  // test connection

  const client = drizzle(migrationConnection);

  await migrate(client, {
    migrationsFolder: "./drizzle",
  });

  await migrationConnection.end();

  //   return db;
};

// onHmr(connection.end);
