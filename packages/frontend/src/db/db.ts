import { PowerSyncDatabase, AbstractPowerSyncDatabase } from "@powersync/web";
import { AppSchema } from "./AppSchema";
import { Connector } from "./Connector";

export const db = new PowerSyncDatabase({
  // The schema you defined in the previous step
  schema: AppSchema,
  database: {
    // Filename for the SQLite database — it's important to only instantiate one instance per file.
    dbFilename: "powersync.db",
    debugMode: true,
    // Optional. Directory where the database file is located.'
    // dbLocation: 'path/to/directory'
  },
});

export const setupPowersync = async () => {
  const connector = new Connector();
  await db.init();
  await db.connect(connector, {
    params: {},
  });
};
