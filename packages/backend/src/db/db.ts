import { PrismaClient } from "@cr-vif/electric-client/backend";
import { ENV } from "../envVars";
console.log(ENV);
export const db = new PrismaClient({ datasources: { db: { url: ENV.DATABASE_URL } } });

export const cleanUpDb = async () => {
  await db.$disconnect();
};
