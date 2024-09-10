declare const self: ServiceWorkerGlobalScope;

import { ExpirationPlugin } from "workbox-expiration";
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(({ request }) => request.mode === "navigate", createHandlerBoundToURL("/"));

self.addEventListener("install", () => void self.skipWaiting());
self.addEventListener("activate", () => void self.clients.claim());

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.tag));
  event.notification.close();
});

// // @ts-expect-error periodicsync is not included in the default SW interface.
// self.addEventListener('periodicsync', (event: PeriodicBackgroundSyncEvent) => {

// });

// self.addEventListener('message', (event) => {

// });
