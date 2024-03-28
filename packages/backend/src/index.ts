import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

import { fastifyInstance } from "./router";
import { db } from "./db/db";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  migrate(db, { migrationsFolder: "./drizzle" });
  console.log(await fastifyInstance.listen({ port: 3001 }));

  onHmr(() => {
    fastifyInstance.close();
  });
};

start();

process.on("SIGINT", function () {
  process.exit();
});
