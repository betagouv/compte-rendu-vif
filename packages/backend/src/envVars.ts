import { config } from "dotenv";
import { z, ZodTypeAny } from "zod";

config({ path: "../../.env" });

const envSchema = z.object({
  LOCAL_DATABASE_URL: z.string(),
  USERS_DATABASE_URL: z.string(),
  EXTERNAL_JWT_SECRET: z.string(),
  PROJECT_ID: z.string(),
  TOKEN_LIFETIME: z.string().default("1w"),
  EMAIL_CLIENT_ID: z.string(),
  EMAIL_CLIENT_SECRET: z.string(),
  NODE_ENV: z.string().default("development"),
});

export const ENV = envSchema.parse(process.env);
export const isDev = ENV.NODE_ENV === "development";
