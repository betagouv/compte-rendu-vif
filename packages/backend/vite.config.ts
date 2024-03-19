import { defineConfig } from "vite";

console.log("config");
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      tsconfig: "packages/backend/tsconfig.json",
    },
  },
});
