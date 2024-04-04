import { electrify, ElectricDatabase } from "electric-sql/wa-sqlite";
import { schema } from "./generated/client";

const config = {
  url: "http://localhost:5133",
};
const conn = await ElectricDatabase.init("my.db", "/");

export const electric = await electrify(conn, schema, config);
export const db = electric.db;
