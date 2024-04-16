import { electrify, ElectricDatabase } from "electric-sql/wa-sqlite";
import { schema } from "./generated/client";
import type { ElectricConfig } from "electric-sql/config";
import { ENV } from "./envVars";
import { createStore, set, get } from "idb-keyval";
const config = {
  url: ENV.VITE_ELECTRIC_URL,
} satisfies ElectricConfig;
const conn = await ElectricDatabase.init("my.db", "/");

export const electric = await electrify(conn, schema, config);
export const db = electric.db;

const customStore = createStore("cr-vif", "images-store");

export const addImageToIdb = async (reportId: string, image: File) => {
  const currentImages = await getImageFromIdb(reportId);
  const blob = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(image);
  });
  await set(reportId, [...(currentImages ?? []), blob], customStore);
};

export const getImageFromIdb = async (reportId: string) => {
  return get(reportId, customStore);
};
