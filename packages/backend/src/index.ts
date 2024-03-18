import { makeRouter } from "./features/router/router";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

console.log("Hello, world!");

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  await makeRouter({ port: 3000 });
};

start();
