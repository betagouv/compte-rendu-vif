import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";
// import "./db/db";
import { Hocuspocus } from "@hocuspocus/server";
import { TiptapTransformer } from "@hocuspocus/transformer";
import * as Y from "yjs";
import promises from "fs/promises";

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");
  initHocuspocus();

  // await makeRouter({ port: 3000 });
};

const initHocuspocus = async () => {
  const server = new Hocuspocus({
    port: 3000,
  });

  server.configure({
    onLoadDocument: async (data) => {
      if (data.document.isEmpty("crs")) {
        const crsRaw = await promises.readFile("store.json", "utf-8");
        const crs = JSON.parse(crsRaw);

        console.log("empty");
        const sharedRoot = data.document.getMap("crs");
        crs.forEach((cr: any) => {
          const crDoc = new Y.Doc();
          const map = crDoc.getMap("cr");
          Object.entries(cr).forEach(([k, v]) => {
            map.set(k, v);
          });

          sharedRoot.set(cr.id, crDoc);
        });
      }
      console.log("onLoadDocument", [...data.document.getMap("crs").entries()]);

      // data.document.on("update", (u) => console.log([...u..entries()]));

      return data.document;
    },
    onStoreDocument: async (data) => {
      const crs = [...data.document.getMap("crs").entries()].map(
        ([k, v]: any) => ({ id: k, ...v })
      );
      console.log("onStoreDocument", crs);

      await promises.writeFile("store.json", JSON.stringify(crs));
    },
  });

  server.listen();

  onHmr(() => server.destroy());
};

start();
