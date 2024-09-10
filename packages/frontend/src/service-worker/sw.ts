declare const self: ServiceWorkerGlobalScope;

import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";

self.addEventListener("sync", (event: BackgroundSyncEvent) => {});

// // @ts-expect-error periodicsync is not included in the default SW interface.
// self.addEventListener('periodicsync', (event: PeriodicBackgroundSyncEvent) => {

// });

// self.addEventListener('message', (event) => {

// });
