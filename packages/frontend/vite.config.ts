import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import wasm from "vite-plugin-wasm";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    wasm(),
    VitePWA({
      devOptions: { enabled: true },
      registerType: "autoUpdate",
      manifest: {
        id: "gouv.beta.compte-rendu-vif",
        orientation: "portrait",
        short_name: "CR-VIF",
        name: "Compte-rendu VIF",
        scope: "/",
        start_url: "/",
        lang: "fr",
        theme_color: "#FFFFFF",
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 2097152 * 3,
        globPatterns: ["**/*.{svg,woff2,js,wasm,css,html}"],
      },
    }),
  ],
  envDir: "../..",
  preview: {},
  build: {
    target: "esnext",
  },
});
