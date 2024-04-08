import { config } from "dotenv";
import { z } from "zod";

config({ path: "../../.env" });

const stringOrNumberAsNumber = z.string().or(z.number()).transform(Number);

const envSchema = z.object({
  PG_PORT: stringOrNumberAsNumber.default(5432),
  PG_HOST: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_USERS_DB: z.string(),
  TOKEN_LIFETIME: z.string().default("1w"),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string().default("development"),
  HTTP_PORT: stringOrNumberAsNumber.default(3001),
  DEBUG: z.string().default("cr-vif:*"),
});

export const ENV = envSchema.parse(process.env);
export const isDev = ENV.NODE_ENV === "development";
