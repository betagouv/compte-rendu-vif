import {
  AnyDocumentId,
  isValidAutomergeUrl,
  Repo,
} from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";

const network = new BrowserWebSocketClientAdapter("ws://localhost:8080");

export const repo = new Repo({
  network: [network],
  storage: new IndexedDBStorageAdapter(),
});

export const getOrCreateHandle = <T extends any>(
  url: string,
  defaultValue: T
) => {
  if (isValidAutomergeUrl(url)) {
    return repo.find(url as AnyDocumentId);
  }
  const handle = repo.create<T>();
  handle.change((doc) => {
    doc.test = "oui";
  });

  return handle;
};
