// // import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
// const { createStore, get } = require("idb-keyval");

// const store = createStore("auth", "access");
// const getTokenFromIdb = async () => {
//   return get("token", store);
// };

// console.log("MDR");

// // // @ts-expect-error periodicsync is not included in the default SW interface.
// // self.addEventListener('periodicsync', (event: PeriodicBackgroundSyncEvent) => {

// // });

// // self.addEventListener('message', (event) => {

// // });

import { createHandlerBoundToURL, precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { skipWaiting, clientsClaim } from "workbox-core";
import { StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { api, getTokenFromIdb } from "../api";
import { getPicturesStore } from "../features/idb";
import { get, keys } from "idb-keyval";
import { initElectric } from "./electric";

declare let self: ServiceWorkerGlobalScope;

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("sync", async (event) => {
  const token = await getTokenFromIdb();
  if (!token) return void console.log("no token");

  const { db } = await initElectric();

  console.log(await db.pictures.findMany({ where: { url: null } }));

  // const toSyncStore = getToSyncStore();

  // console.log(await keys(toSyncStore));
});

const syncMissingPictures = async (ids: string[], token: string) => {
  const store = getPicturesStore();
  const localIds = await keys(store);

  const missingIds = ids.filter((id) => !localIds.includes(id));

  for (const id of missingIds) {
    const buffer = await get(id, store);
    if (!buffer) {
      console.log("missing buffer for id", id);
      continue;
    };

    const formData = new FormData();
    formData.append("file", new Blob([buffer]), "file");

    api.post("/api/upload/image", {
      body: formData,
      header: { Authorization: `Bearer ${token}` },
    } as any)
  }
};
