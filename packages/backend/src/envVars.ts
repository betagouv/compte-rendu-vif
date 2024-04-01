import { config } from "dotenv";
import { z, ZodTypeAny } from "zod";

config({ path: "../../.env" });

const stringOrNumberAsNumber = z.string().or(z.number()).transform(Number);

const envSchema = z.object({
  LOCAL_DATABASE_URL: z.string(),
  USERS_DATABASE_URL: z.string(),
  EXTERNAL_JWT_SECRET: z.string(),
  PROJECT_ID: z.string(),
  TOKEN_LIFETIME: z.string().default("1w"),
  // EMAIL_CLIENT_ID: z.string(),
  // EMAIL_CLIENT_SECRET: z.string(),
  NODE_ENV: z.string().default("development"),
  TRIPLIT_PORT: stringOrNumberAsNumber.default(3000),
  HTTP_PORT: stringOrNumberAsNumber.default(3001),
});

export const ENV = envSchema.parse(process.env);
export const isDev = ENV.NODE_ENV === "development";
