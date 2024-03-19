import { config } from "dotenv";
import { z, ZodTypeAny } from "zod";

config({ path: "../../.env" });

const envSchema = z.object({
  POSTGRES_PORT: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string().default("0.0.0.0"),
  POSTGRES_PASSWORD: z.string(),
});

export const ENV = envSchema.parse(process.env);
