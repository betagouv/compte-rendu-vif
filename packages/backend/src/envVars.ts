import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config({ path: "../../.env" }));

const stringOrNumberAsNumber = z.string().or(z.number()).transform(Number);

const envSchema = z.object({
  PG_PORT: stringOrNumberAsNumber.default(5432),
  PG_HOST: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_DB: z.string(),
  DATABASE_URL: z.string(),
  TOKEN_LIFETIME: z.string().default("1w"),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string().default("development"),
  PORT: stringOrNumberAsNumber.default(3001),
  AWS_BUCKET_NAME: z.string(),
  AWS_REGION: z.string(),
  DEBUG: z.string().default("cr-vif:*"),
});

export const ENV = envSchema.parse(process.env);
export const isDev = ENV.NODE_ENV === "development";
