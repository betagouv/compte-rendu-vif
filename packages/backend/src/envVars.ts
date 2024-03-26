import { config } from "dotenv";
import { z, ZodTypeAny } from "zod";

config({ path: "../../.env" });

const envSchema = z.object({
  LOCAL_DATABASE_URL: z.string(),
  USERS_DATABASE_URL: z.string(),
  EXTERNAL_JWT_SECRET: z.string(),
  PROJECT_ID: z.string(),
  TOKEN_LIFETIME: z.string().default("1w"),
});

export const ENV = envSchema.parse(process.env);
