import { ENV } from "../envVars";
import { schema } from "@cr-vif/electric-client/frontend";
import { electrify, ElectricDatabase } from "electric-sql/wa-sqlite";
import type { ElectricConfig } from "electric-sql/config";

export const initElectric = async () => {
  console.log(ENV);
  const config = {
    url: ENV.VITE_ELECTRIC_URL,
  } satisfies ElectricConfig;
  const conn = await ElectricDatabase.init("crvif.db", "/");

  const electric = await electrify(conn, schema, config);
  const db = electric.db;

  return { electric, db };
};