import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { unplugin } from "@pandabox/unplugin";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite({})],
  optimizeDeps: {
    exclude: ['wa-sqlite'],
  },
  assetsInclude: [`**/*.wasm`],
});
