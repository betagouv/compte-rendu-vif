import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

import { cleanUpDb, db, migrateUsersDb } from "./db/db";
import { ENV } from "./envVars";
import { generateOpenApi, initFastify } from "./router";
import { makeDebug } from "./features/debug";
import { upload } from "./services/uploadService";

const debug = makeDebug("index");

const start = async () => {
  await upload();
  // await registerViteHmrServerRestart();

  // debug("Migrating database");
  // await migrateUsersDb();

  // debug("Starting fastify server");
  // const fastifyInstance = await initFastify();
  // await fastifyInstance.listen({ port: ENV.HTTP_PORT, host: "0.0.0.0" });

  // debug(`Server listening on ${ENV.HTTP_PORT}`);

  // onHmr(async () => {
  //   await fastifyInstance.close();
  // });
};

const shouldCreateOnly = process.argv.includes("--create-only");

if (shouldCreateOnly) {
  debug("Generating openapi.json");
  await generateOpenApi();

  debug("openapi.json generated");
  process.exit(0);
} else {
  start();
}

process.on("SIGINT", () => {
  process.exit();
});
