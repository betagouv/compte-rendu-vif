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
});

export const ENV = envSchema.parse(process.env);
console.log(ENV);
