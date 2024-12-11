import { UpdateType, PowerSyncBackendConnector, AbstractPowerSyncDatabase, CrudBatch } from "@powersync/web";
import { safeJSONParse } from "pastable";
import { api } from "../api";
import { get } from "idb-keyval";
import { getPicturesStore } from "../features/idb";
import { ENV } from "../envVars";

const emitterChannel = new BroadcastChannel("sw-messages");

export class Connector implements PowerSyncBackendConnector {
  async fetchCredentials() {
    const token = await getTokenOrRefresh();

    return {
      endpoint: ENV.VITE_POWERSYNC_URL,
      token,
    };
  }

  hasUpdated = false;

  async uploadData(database: AbstractPowerSyncDatabase) {
    // See example implementation here: https://docs.powersync.com/client-sdk-references/javascript-web#3-integrate-with-your-backend
    const batchTransactions = await database.getCrudBatch();
    if (!batchTransactions) return;

    for (const operation of batchTransactions.crud) {
      console.log("applying operation", operation.toJSON());

      if (operation.table === "pictures" && operation.op === "PUT") {
        const formData = new FormData();
        const buffer = await get(operation.id, getPicturesStore());

        formData.append("file", new Blob([buffer]), "file");

        await api.post("/api/upload/image", {
          body: formData,
          query: {
            id: operation.id,
            reportId: operation.opData?.reportId,
          },
        } as any);

        emitterChannel.postMessage({ type: "status", id: operation.id, status: "success" });

        continue;
      }

      await api.post("/api/upload-data", { body: operation.toJSON() });
    }

    batchTransactions.complete();
  }
}

export const getTokenOrRefresh = async () => {
  const authData = safeJSONParse(window.localStorage.getItem("crvif/auth") ?? "");
  if (!authData) throw new Error("No auth data found");

  if (new Date(authData.expiresAt) < new Date()) {
    const resp = await api.get("/api/refresh-token", {
      query: { token: authData.token, refreshToken: authData.refreshToken! },
    });

    if (resp.token === null) {
      console.log("token expired but couldn't find a refresh token, logging out");
      window.localStorage.removeItem("crvif/auth");
    } else {
      console.log("token refreshed");
      window.localStorage.setItem("crvif/auth", JSON.stringify({ ...authData, ...resp }));
    }
  }

  return authData.token as string;
};
