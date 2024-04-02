import { WebSocketServer } from "ws";
import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";
import { ENV } from "../envVars";
import { onHmr } from "../hmr";
import { Repo, type DocHandle } from "@automerge/automerge-repo";
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs";

export class RepoService {
  handles: Map<string, DocHandle<any>> = new Map();

  getOrCreateRepo(repoId: string) {
    const existing = this.handles.get(repoId);
    if (existing) return existing.url;

    const handle = repo.create<{ name: string }>({ name: "salut" });
    this.handles.set(repoId, handle);
    console.log(handle.url);
    return handle.url;
  }
}

const wss = new WebSocketServer({ port: ENV.WS_PORT });
const adapter = new NodeWSServerAdapter(wss);

wss.on("open", () => {
  console.log("WS server open");
});

const repo = new Repo({
  network: [adapter],
  storage: new NodeFSStorageAdapter("../../local_db/repos"),
});

onHmr(() => {
  wss.close();
});
