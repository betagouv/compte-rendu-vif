import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@cr-vif/schemas";
import { DrizzleConfig } from "drizzle-orm";
import postgres from "postgres";
import { ENV, isDev } from "../envVars";

const client = postgres(ENV.DATABASE_URL, {});

export const db = drizzle({
  client,
  schema,
});
