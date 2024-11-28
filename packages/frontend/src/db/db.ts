import { PowerSyncDatabase, AbstractPowerSyncDatabase } from "@powersync/web";
import { AppSchema, Database } from "./AppSchema";
import { Connector } from "./Connector";
import { wrapPowerSyncWithKysely } from "@powersync/kysely-driver";
import { useQuery } from "@powersync/react";

export const powerSyncDb = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: "powersync.db",
  },
});

export const db = wrapPowerSyncWithKysely<Database>(powerSyncDb);
export const useDbQuery = useQuery;

export const setupPowersync = async () => {
  const connector = new Connector();
  await powerSyncDb.init();
  await powerSyncDb.connect(connector, {});
};
