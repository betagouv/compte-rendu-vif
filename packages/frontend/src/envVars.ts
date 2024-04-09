import { z } from "zod";

const isDev = !z.boolean().parse(import.meta.env.PROD);

const envSchema = z.object({
  VITE_BACKEND_URL: z.string(),
  VITE_ELECTRIC_URL: z.string(),
});

export const ENV = envSchema.parse(isDev ? import.meta.env : window.ENV);
declare global {
  interface Window {
    ENV: typeof ENV;
  }
}
