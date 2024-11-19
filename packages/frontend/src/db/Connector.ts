import { UpdateType, PowerSyncBackendConnector, AbstractPowerSyncDatabase, CrudBatch } from "@powersync/web";
import { safeJSONParse } from "pastable";
import { api } from "../api";

export class Connector implements PowerSyncBackendConnector {
  constructor() {
    // Setup a connection to your server for uploads
    // this.serverConnectionClient = TODO;
  }

  async fetchCredentials() {
    // Implement fetchCredentials to obtain a JWT from your authentication service.
    // See https://docs.powersync.com/installation/authentication-setup
    // If you're using Supabase or Firebase, you can re-use the JWT from those clients, see
    // - https://docs.powersync.com/installation/authentication-setup/supabase-auth
    // - https://docs.powersync.com/installation/authentication-setup/firebase-auth

    const token = await getTokenOrRefresh();

    return {
      endpoint: "http://localhost:8080",
      token, // Use a development token (see Authentication Setup https://docs.powersync.com/installation/authentication-setup/development-tokens) to get up and running quickly
      // token: 'An authentication token'
    };
  }

  async uploadData(database: AbstractPowerSyncDatabase) {
    console.log(database);
    console.log(await database.getCrudBatch());
    // const a: CrudBatch;
    // Implement uploadData to send local changes to your backend service.
    // You can omit this method if you only want to sync data from the database to the client

    // See example implementation here: https://docs.powersync.com/client-sdk-references/javascript-web#3-integrate-with-your-backend
  }
}

const getTokenOrRefresh = async () => {
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

  return authData.token;
};
