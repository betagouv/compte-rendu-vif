import { z } from "zod";

export const isDev = !z.boolean().parse(import.meta.env.PROD);

const envSchema = z.object({
  VITE_BACKEND_URL: z.string(),
  VITE_ELECTRIC_URL: z.string(),
  VITE_POWERSYNC_URL: z.string(),
});

const isSW = typeof window === "undefined";

const safeParseEnv = (env: Record<string, string>): z.infer<typeof envSchema> => {
  try {
    return envSchema.parse(env);
  } catch (e) {
    console.error("Error parsing env vars");
    return {} as any;
  }
};

export const ENV = safeParseEnv(isDev ? import.meta.env : isSW ? self.ENV : window.ENV);

declare global {
  interface Window {
    ENV: typeof ENV;
    APP_VERSION?: string;
  }
}
