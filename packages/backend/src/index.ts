import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";
// import "./db/db";

import { WebSocketServer } from "ws";
import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  const wss = new WebSocketServer({ port: 8080 });
  const adapter = new NodeWSServerAdapter(wss);

  wss.on("connection", (ws) => {
    ws.on("message", (m) => console.log(m.toString()));
  });
  adapter.on("message", console.log);

  onHmr(() => wss.close());

  // await makeRouter({ port: 3000 });
};

start();
