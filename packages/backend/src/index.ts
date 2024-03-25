import "./envVars";
import { registerViteHmrServerRestart } from "./hmr";

import { migrateDb } from "./db/db";

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  const db = await migrateDb();
  // db.select().from(reports).then(console.log);
};

start();

process.on("SIGINT", function () {
  process.exit();
});
