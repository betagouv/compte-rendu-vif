import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { apiStore, createApiClientWithUrl, getTokenFromIdb } from "../api";
import { getPicturesStore, getToUploadStore, getUploadStatusStore } from "../features/idb";
import { get, keys, del, set } from "idb-keyval";

declare let self: ServiceWorkerGlobalScope;

skipWaiting();
clients.claim()

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);



// self.skipWaiting();
// self.clients.claim();

// self.addEventListener("install", () => void );
// self.addEventListener("activate", () => void );
self.addEventListener("sync", async (event: any) => {
  event.waitUntil(syncMissingPictures());
});
// self.addEventListener("periodicsync", async (event: any) => {
//   event.waitUntil(syncMissingPictures());
// });

const syncMissingPictures = async (retries = 3) => {
  try {
    const token = await getTokenFromIdb();
    if (!token) return void console.log("no token");

    const pictureIds = await keys(getToUploadStore());

    console.log("syncing", pictureIds.length, "missing pictures");

    await syncPicturesById(pictureIds as string[], token);
  } catch (e) {
    if (retries > 0) {
      console.log("retrying in 5s", e);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return syncMissingPictures(retries - 1);
    }

    throw e;
  }
};

const syncPicturesById = async (ids: string[], token: string) => {
  const store = getPicturesStore();
  const toUploadStore = getToUploadStore();

  const localIds = await keys(store);
  const missingIds = ids.filter((picId) => localIds.includes(picId));

  const url = await get("url", apiStore);

  if (!url) throw new Error("no backend url in service worker");

  const api = createApiClientWithUrl(url);

  for (const picId of missingIds) {
    try {
      await set(picId, "uploading", getUploadStatusStore());

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

      console.log("done");
    } catch (e) {
      await set(picId, "error", getUploadStatusStore());
      throw e;
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
