import { electrify, ElectricDatabase } from "electric-sql/wa-sqlite";
import type { ElectricConfig } from "electric-sql/config";
import { ENV } from "./envVars";
import { schema } from "@cr-vif/electric-client/frontend";

const config = {
  url: ENV.VITE_ELECTRIC_URL,
} satisfies ElectricConfig;
const conn = await ElectricDatabase.init("crvif.db", "/");

export const electric = await electrify(conn, schema, config);
export const db = electric.db;
