// import { TriplitClient } from "@triplit/client";
import { ENV } from "./envVars";

// export const db = new TriplitClient({
//   serverUrl: ENV.VITE_TRIPLIT_URL,
//   schema: {},
//   storage: "indexeddb",
// });
import { isValidAutomergeUrl, Repo } from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { next as A } from "@automerge/automerge"; //why `next`? See the the "next" section of the conceptual overview
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";

export const repo = new Repo({
  network: [new BroadcastChannelNetworkAdapter(), new BrowserWebSocketClientAdapter(ENV.VITE_WS_URL)],
  storage: new IndexedDBStorageAdapter(),
});
