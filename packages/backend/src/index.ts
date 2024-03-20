import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";
// import "./db/db";
import { Hocuspocus } from "@hocuspocus/server";
import { TiptapTransformer } from "@hocuspocus/transformer";
import * as Y from "yjs";

const document = new Y.Doc();
document.getArray("tasks").insert(0, [{ name: "1" }]);

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  const server = new Hocuspocus({
    port: 3000,
  });

  server.configure({
    onLoadDocument: async (doc) => {
      console.log(doc.documentName);
      if (doc.documentName === "tasks") {
        return document;
      }
    },
  });

  server.listen();

  onHmr(() => server.destroy());
  // await makeRouter({ port: 3000 });
};

start();
