// import { TriplitClient } from "@triplit/client";
import { ENV } from "./envVars";
import { electrify, ElectricDatabase } from "electric-sql/wa-sqlite";
import { schema } from "./generated/client";

const config = {
  url: "http://localhost:5133",
};
const conn = await ElectricDatabase.init("my.db", "/");

export const electric = await electrify(conn, schema, config);
export const db = electric.db;

// export const db = new TriplitClient({
//   serverUrl: ENV.VITE_TRIPLIT_URL,
//   schema: {},
//   storage: "indexeddb",
// });
// import { isValidAutomergeUrl, Repo } from "@automerge/automerge-repo";
// import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
// import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
// import { next as A } from "@automerge/automerge"; //why `next`? See the the "next" section of the conceptual overview
// import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";

// export const repo = new Repo({
//   network: [new BroadcastChannelNetworkAdapter(), new BrowserWebSocketClientAdapter(ENV.VITE_WS_URL)],
//   storage: new IndexedDBStorageAdapter(),
// });
