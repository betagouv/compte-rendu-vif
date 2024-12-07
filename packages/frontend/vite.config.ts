import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import wasm from "vite-plugin-wasm";
import { VitePWA } from "vite-plugin-pwa";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    wasm(),
    VitePWA({
      devOptions: { enabled: true, type: "module" },

      registerType: "autoUpdate",
      manifest: {
        id: "gouv.beta.compte-rendu-vif",
        orientation: "portrait",
        short_name: "CR-VIF",
        name: "Compte-rendu VIF",
        scope: "/",
        start_url: "/",
        lang: "fr",
        icons: [
          {
            src: "dsfr/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "dsfr/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#FFFFFF",
      },
      manifestFilename: "manifest.webmanifest",
      injectManifest: {
        maximumFileSizeToCacheInBytes: 2097152 * 3,
        globPatterns: ["**/*.{svg,woff2,js,wasm,css,html,png}"],
        rollupFormat: "es",
      },
      includeAssets: ["**/*.{svg,woff2,wasm}"],
      strategies: "injectManifest",
      srcDir: "src/service-worker",
      filename: "sw.ts",
    }),
  ],
  optimizeDeps: {
    exclude: ["@journeyapps/wa-sqlite", "@powersync/web"],
    include: ["@powersync/web > js-logger"],
  },
  envDir: "../..",
  preview: {},
  build: {
    target: "esnext",
  },
  worker: {
    format: "es",
    plugins: () => [wasm(), topLevelAwait()],
  },
});
