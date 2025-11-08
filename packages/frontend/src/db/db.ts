import { PowerSyncDatabase } from "@powersync/web";
import { AppSchema, Database } from "./AppSchema";
import { Connector } from "./Connector";
import { wrapPowerSyncWithKysely } from "@powersync/kysely-driver";
import { useQuery } from "@powersync/react";
import Bowser from "bowser";
import { AttachmentQueue } from "./AttachmentQueue";
import { AttachmentStorage } from "./Storage";

const browser = Bowser.getParser(window.navigator.userAgent);
const isFirefox = browser.getBrowser().name === "Firefox";

export const powerSyncDb = new PowerSyncDatabase({
  schema: AppSchema,
  flags: {
    useWebWorker: false,
  },
  database: {
    dbFilename: "crvif-sync.db",
  },
});

export const attachmentStorage = new AttachmentStorage();
export const attachmentQueue = new AttachmentQueue({
  powersync: powerSyncDb,
  storage: attachmentStorage,
  onDownloadError: async (attachment, error) => {
    console.log(error);
    return { retry: true };
  },
});

export const db = wrapPowerSyncWithKysely<Database>(powerSyncDb);
export const useDbQuery = useQuery;

export const setupPowersync = async () => {
  const connector = new Connector();
  await powerSyncDb.init();
  await powerSyncDb.connect(connector, {
    params: {
      schema_version: 1,
    },
  });
  await attachmentQueue.init();
};

export const clearDb = async () => {
  await db.destroy();
  await powerSyncDb.disconnectAndClear();
  await powerSyncDb.close();
};

export const getAttachmentUrl = async (attachmentId: string) => {
  const buffer = await attachmentStorage.readFile(attachmentId);
  const blob = new Blob([buffer], { type: "image/png" });
  return URL.createObjectURL(blob);
};
