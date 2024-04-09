import { electrify, ElectricDatabase } from "electric-sql/wa-sqlite";
import { schema } from "./generated/client";
import type { ElectricConfig } from "electric-sql/config";

const config = {
  url: "http://localhost:5133",
} satisfies ElectricConfig;
const conn = await ElectricDatabase.init("my.db", "/");

export const electric = await electrify(conn, schema, config);
export const db = electric.db;
