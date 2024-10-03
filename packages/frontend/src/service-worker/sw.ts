import { precacheAndRoute } from "workbox-precaching";
import { api, getTokenFromIdb } from "../api";
import { getPicturesStore } from "../features/idb";
import { del, get, keys } from "idb-keyval";
import { initElectric } from "./electric";
import { Pictures } from "@cr-vif/electric-client/frontend";

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => void self.skipWaiting());
self.addEventListener("activate", () => void self.clients.claim());
self.addEventListener("sync", async (event: any) => {
  event.waitUntil(syncMissingPictures());
});

const ref = {
  db: null as Awaited<ReturnType<typeof initElectric>>["db"] | null,
};

const getDb = async () => {
  if (!ref.db) {
    ref.db = (await initElectric()).db;
  }

  return ref.db;
};

const syncMissingPictures = async (retries = 3) => {
  try {
    const token = await getTokenFromIdb();
    if (!token) return void console.log("no token");

    const db = await getDb();
    const pictures = await db.pictures.findMany({ where: { url: null } });

    console.log("syncing", pictures.length, "missing pictures");

    await syncPicturesById(pictures, token);
  } catch (e) {
    if (retries > 0) {
      console.log("retrying in 5s", e);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return syncMissingPictures(retries - 1);
    }

    throw e;
  }

  // await cleanupOldCaches();
};

const syncPicturesById = async (ids: Pictures[], token: string) => {
  const store = getPicturesStore();
  const localIds = await keys(store);
  const missingIds = ids.filter((pic) => localIds.includes(pic.id));

  for (const pic of missingIds) {
    console.log("syncing picture", pic);
    const buffer = await get(pic.id, store);
    if (!buffer) {
      console.log("missing buffer for id", pic.id);
      continue;
    }

    const formData = new FormData();
    formData.append("file", new Blob([buffer]), "file");
    formData.append("reportId", pic.reportId!);
    formData.append("pictureId", pic.id);

    await api.post("/api/upload/image", {
      body: formData,
      query: { reportId: pic.reportId, id: pic.id },
      header: { Authorization: `Bearer ${token}` },
    } as any);

    console.log("done");
  }
};

const cleanupOldCaches = async () => {
  const db = await getDb();

  const keysToKeep = await db.pictures.findMany({ where: { url: null } });

  const store = getPicturesStore();
  const localIds = await keys(store);

  const keysToDelete = localIds.filter((id) => !keysToKeep.some((pic) => pic.id === id));

  console.log("deleting", keysToDelete.length, "old pictures");

  for (const key of keysToDelete) {
    await del(key, store);
  }

  console.log("done");
};
