import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config({ path: "../../.env" }));

const stringOrNumberAsNumber = z.string().or(z.number()).transform(Number);

const envSchema = z.object({
  POSTGRES_PORT: stringOrNumberAsNumber.default(5432),
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string(),
  TOKEN_LIFETIME: z.string().default("60m"),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  NODE_ENV: z.string().default("development"),
  PORT: stringOrNumberAsNumber.default(3001),
  AWS_BUCKET_NAME: z.string(),
  AWS_REGION: z.string(),
  AWS_ENDPOINT: z.string(),
  DEBUG: z.string().default("cr-vif:*"),
  FRONTEND_URL: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: stringOrNumberAsNumber.default(465),
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
  EMAIL_EMITTER: z.string(),
  MINIO_ACCESS_KEY_ID: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_URL: z.string(),
  MINIO_BUCKET: z.string(),
  SENTRY_DSN: z.string().optional(),
});

export const ENV = envSchema.parse(process.env);
export const isDev = ENV.NODE_ENV === "development";
export const isTest = ENV.NODE_ENV === "test";
