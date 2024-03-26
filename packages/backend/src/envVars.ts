import { config } from "dotenv";
import { z, ZodTypeAny } from "zod";

config({ path: "../../.env" });

const envSchema = z.object({
  LOCAL_DATABASE_URL: z.string(),
});

export const ENV = envSchema.parse(process.env);
