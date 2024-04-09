import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), wasm()],
  envDir: "../..",
  worker: {
    format: "es",
    plugins: () => [wasm()],
  },
  build: {
    target: "esnext",
  },
});
