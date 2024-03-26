import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

import { createServer } from "@triplit/server";
import { migrations } from "../../frontend/triplit/migrations";

const server = createServer({
  storage: "sqlite",
  dbOptions: {
    migrations: migrations,
  },
})(3000);

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  onHmr(server.close);
};

start();
process.on("SIGINT", function () {
  server.close(() => {
    console.log("Shut down server");
    // some cleanup code
    process.exit();
  });
});
