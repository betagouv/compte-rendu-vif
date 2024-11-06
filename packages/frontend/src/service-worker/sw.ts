import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { apiStore, createApiClientWithUrl, getTokenFromIdb } from "../api";
import { getPicturesStore, getToUploadStore, getUploadStatusStore } from "../features/idb";
import { get, keys, del, set } from "idb-keyval";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { isDev } from "../envVars";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

const manif = self.__WB_MANIFEST;
cleanupOutdatedCaches();
precacheAndRoute(manif);

if (!isDev) {
  const handler = createHandlerBoundToURL("/index.html");
  registerRoute(new NavigationRoute(handler));
}

const broadcastChannel = new BroadcastChannel("sw-messages");

self.addEventListener("sync", async (event: any) => {
  broadcastChannel.postMessage({ type: "sync" });
  event.waitUntil(syncMissingPictures());
});

const syncMissingPictures = async () => {
  try {
    const token = await getTokenFromIdb();
    if (!token) return void console.log("no token");

    const pictureIds = await keys(getToUploadStore());

    console.log("syncing", pictureIds.length, "missing pictures");

    await syncPicturesById(pictureIds as string[], token);
  } catch (e) {
    console.error("sync error", e);
  }
};

const syncPicturesById = async (ids: string[], token: string) => {
  const store = getPicturesStore();
  const toUploadStore = getToUploadStore();

  const localIds = await keys(store);
  const missingIds = ids.filter((picId) => localIds.includes(picId));

  const url = await get("url", apiStore);

  if (!url) return void console.error("no backend url in service worker");

  const api = createApiClientWithUrl(url);

  for (const picId of missingIds) {
    try {
      await set(picId, "uploading", getUploadStatusStore());
      broadcastChannel.postMessage({ type: "status", id: picId, status: "uploading" });

      const reportId = await get(picId, toUploadStore);

      console.log("syncing picture", picId);
      const buffer = await get(picId, store);
      if (!buffer) {
        console.log("missing buffer for id", picId);
        continue;
      }

      const formData = new FormData();
      formData.append("file", new Blob([buffer]), "file");
      formData.append("reportId", reportId);
      formData.append("pictureId", picId);

      await api.post("/api/upload/image", {
        body: formData,
        query: { reportId: reportId, id: picId },
        header: { Authorization: `Bearer ${token}` },
      } as any);

      await del(picId, toUploadStore);

      await set(picId, "success", getUploadStatusStore());
      broadcastChannel.postMessage({ type: "status", id: picId, status: "success" });

      console.log("done");
    } catch (e) {
      await set(picId, "error", getUploadStatusStore());
      broadcastChannel.postMessage({ type: "status", id: picId, status: "error" });
    }
  }
};

// const cleanupOldCaches = async () => {
//   const db = await getDb();

//   const keysToKeep = await db.pictures.findMany({ where: { url: null } });

//   const store = getPicturesStore();
//   const localIds = await keys(store);

//   const keysToDelete = localIds.filter((id) => !keysToKeep.some((pic) => pic.id === id));

//   console.log("deleting", keysToDelete.length, "old pictures");

//   for (const key of keysToDelete) {
//     await del(key, store);
//   }

//   console.log("done");
// };
