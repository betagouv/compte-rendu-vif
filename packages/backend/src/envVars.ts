import { config } from "dotenv";
import { z, ZodTypeAny } from "zod";

config({ path: "../../.env" });
export const stringOrNumberAsNb = z.string().or(z.number()).transform(Number);

const envSchema = z.object({
  PG_PORT: stringOrNumberAsNb.default(5432),
  PG_DB: z.string(),
  PG_USER: z.string(),
  PG_HOST: z.string().default("0.0.0.0"),
  PG_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  TOKEN_LIFETIME: z.string().default("1w"),
  NODE_ENV: z.string().default("development"),
});

export const ENV = envSchema.parse(process.env);
export const isDev = ENV.NODE_ENV === "development";
console.log(ENV);
