import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";
import "./db/db";
const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  // await makeRouter({ port: 3000 });
};

start();
