import { AbstractPowerSyncDatabase, PowerSyncBackendConnector } from "@powersync/web";
import { get } from "idb-keyval";
import { api, RouterOutputs, unauthenticatedApi } from "../api";
import { apiStore, get80PercentOfTokenLifespan } from "../ApiStore";
import { ENV } from "../envVars";
import { getPicturesStore } from "../features/idb";

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
  console.log("getting token or refresh");
  if (!apiStore.loaded) throw new Error("Auth not loaded");

  if (!apiStore.accessToken || !apiStore.refreshToken || !apiStore.expiresAt) throw new Error("No token found");

  if (new Date(apiStore.expiresAt) < new Date()) {
    console.log("token expired, refreshing...", { ...apiStore });
    const resp: RouterOutputs<"/api/refresh-token"> = await unauthenticatedApi.post("/api/refresh-token", {
      body: { refreshToken: apiStore.refreshToken },
    });

    if (resp.access_token === null) {
      console.log("token expired but couldn't find a refresh token, logging out");

      apiStore.accessToken = null;
      apiStore.refreshToken = null;
      apiStore.expiresAt = null;
      apiStore.user = null;
      await apiStore.save();

      throw new Error("Session expirée, veuillez vous reconnecter");
    } else {
      console.log("token refreshed");

      apiStore.accessToken = resp.access_token;
      apiStore.refreshToken = resp.refresh_token;
      apiStore.expiresAt = new Date(get80PercentOfTokenLifespan(Number(resp.expires_in))).toISOString();
      await apiStore.save();
    }
  } else console.log("token valid");

  return apiStore.accessToken;
};
