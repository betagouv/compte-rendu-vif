import { WebSocketServer } from "ws";
import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";
import { ENV } from "../envVars";
import { onHmr } from "../hmr";
import {
  Repo,
  type DocHandle,
  stringifyAutomergeUrl,
  BinaryDocumentId,
  isValidAutomergeUrl,
  AutomergeUrl,
} from "@automerge/automerge-repo";
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs";
import { v4 } from "uuid";

export class RepoService {
  handles: Map<string, DocHandle<any>> = new Map();

  getOrCreateRepo(repoId: string) {
    console.log(repoId);
    // if (isValidAutomergeUrl(repoId)) {
    //   return repo.find(repoId).url;
    // }
    // // const existing = this.handles.get(repoId);
    // // console.log("existing", existing?.url);
    // // if (existing) return existing.url;

    // const handle = repo.create<{ name: string }>({ name: "salut" });
    // // this.handles.set(repoId, handle);
    // console.log("created:", handle.url);
    // return handle.url;
  }
}

// import * as Y from "yjs";
// import { Server } from "@hocuspocus/server";

// // import { Hocuspocus } from "@hocuspocus/server";
// import { SQLite } from "@hocuspocus/extension-sqlite";

// const sqlite = new SQLite({
//   database: "../../local_db/hocuspocus.sqlite",
// });
// const server = Server.configure({
//   port: ENV.WS_PORT,

//   onChange: async (payload) => {
//     console.log(payload.document);
//   },

//   onAuthenticate: async (payload) => {
//     payload.documentName;
//   },
// });

// server.listen();

// onHmr(() => server.destroy());

// const doc = new Y.Doc();
// const wsProvider = new WebsocketProvider("ws://localhost:1234", "roomName", doc, { WebSocketPolyfill: ws });

// wsProvider.on("status", (e) => console.log(e.status));
// const uuid = Uint8Array.from([
//   251, 65, 151, 55, 143, 34, 76, 8, 178, 152, 120, 121, 62, 243, 20, 225,
// ]) as BinaryDocumentId;
// console.log(stringifyAutomergeUrl({ documentId: uuid }));

// const wss = new WebSocketServer({ port: ENV.WS_PORT });
// const adapter = new NodeWSServerAdapter(wss);

// wss.on("open", () => {
//   console.log("WS server open");
// });

// const repo = new Repo({
//   network: [adapter],
//   storage: new NodeFSStorageAdapter("../../local_db/repos"),
// });

// const handle = repo.find<{ name: string }>("automerge:2VPjw82u3FzVSdoSQhvHgYy9QY7Z" as AutomergeUrl);
// handle.on("change", (payload) => {
//   console.log("change", payload);
// });

// onHmr(() => {
//   wss.close();
// });
// // automerge:3E965JHQEkjui44otBwiLFWWhsPP
