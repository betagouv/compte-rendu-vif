import { z } from "zod";

const isDev = !z.boolean().parse(import.meta.env.PROD);

const envSchema = z.object({
  VITE_BACKEND_URL: z.string(),
  VITE_ELECTRIC_URL: z.string(),
});

const isSW = typeof window === "undefined";
console.log("isSW", isSW);
console.log("isDev", isDev);

const safeParseEnv = (env: Record<string, string>) => {
  try {
    return envSchema.parse(env);
  } catch (e) {
    console.error("Error parsing env", e);
    return {};
  }
};

export const ENV = safeParseEnv(isDev ? import.meta.env : isSW ? self.ENV : window.ENV);

declare global {
  interface Window {
    ENV: typeof ENV;
    APP_VERSION?: string;
  }
}
