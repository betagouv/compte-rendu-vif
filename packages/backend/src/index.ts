import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

import { fastifyInstance } from "./router";

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  console.log(await fastifyInstance.listen({ port: 3001 }));

  onHmr(() => {
    fastifyInstance.close();
  });
};

start();

process.on("SIGINT", function () {
  process.exit();
});
