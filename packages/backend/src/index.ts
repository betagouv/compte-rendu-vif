import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

import { ENV } from "./envVars";
import { generateOpenApi, initFastify } from "./router";
import { makeDebug } from "./features/debug";
import { initClauseV2 } from "./tmp";
import { initFonts } from "@cr-vif/pdf";

const debug = makeDebug("index");

const start = async () => {
  await registerViteHmrServerRestart();

  // await initClauseV2();
  debug("Starting fastify server in", ENV.NODE_ENV, "mode");

  const fastifyInstance = await initFastify();
  await fastifyInstance.listen({ port: ENV.PORT, host: "0.0.0.0" });

  debug(`Server listening on ${ENV.PORT}`);

  onHmr(async () => {
    await fastifyInstance.close();
  });
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

const onSIGINT = () => process.exit();
process.on("SIGINT", onSIGINT);
onHmr(() => process.off("SIGINT", onSIGINT));
