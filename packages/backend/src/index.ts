import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";
// import "./db/db";

import { createServer } from "@triplit/server";

const server = createServer({
  storage: "memory",
})(3000);

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  onHmr(() => new Promise((resolve) => server.close(() => resolve(true))));
  // await makeRouter({ port: 3000 });
};

start();
process.on("SIGINT", function () {
  server.close(() => {
    console.log("Shut down server");
    // some cleanup code
    process.exit();
  });
});
