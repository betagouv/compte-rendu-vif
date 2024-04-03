import { config } from "dotenv";
import { z } from "zod";

config({ path: "../../.env" });

const stringOrNumberAsNumber = z.string().or(z.number()).transform(Number);

const envSchema = z.object({
  USERS_DATABASE_URL: z.string(),
  TOKEN_LIFETIME: z.string().default("1w"),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string().default("development"),
  HTTP_PORT: stringOrNumberAsNumber.default(3001),
});

export const ENV = envSchema.parse(process.env);
export const isDev = ENV.NODE_ENV === "development";
