import { electrify, ElectricDatabase } from "electric-sql/wa-sqlite";
import { schema } from "./generated/client";
import type { ElectricConfig } from "electric-sql/config";
import { ENV } from "./envVars";

const config = {
  url: ENV.VITE_ELECTRIC_URL,
} satisfies ElectricConfig;
const conn = await ElectricDatabase.init("my.db", "/");

export const electric = await electrify(conn, schema, config);
export const db = electric.db;
