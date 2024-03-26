import "./envVars";
import { registerViteHmrServerRestart } from "./hmr";

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");
};

start();

process.on("SIGINT", function () {
  process.exit();
});
