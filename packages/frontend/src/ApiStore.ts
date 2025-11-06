import { createStore, get, set, del } from "idb-keyval";
import { AuthUser } from "./api";
import { ENV } from "./envVars";

export class ApiStore {
  loaded = false;
  url: string | null = null;
  accessToken: string | null = null;
  expiresAt: string | null = null;
  refreshToken: string | null = null;
  user: AuthUser | null = null;
  store = createStore("auth", "access");

  constructor() {}

  async load() {
    await this.loadUrl();
    this.accessToken = (await get("accessToken", this.store)) ?? null;
    this.expiresAt = (await get("expiresAt", this.store)) ?? null;
    this.refreshToken = (await get("refreshToken", this.store)) ?? null;
    await this.loadUser();

    this.loaded = true;
  }

  async loadUrl() {
    this.url = (await get("url", this.store)) ?? null;

    if (!this.url) {
      this.url = ENV.VITE_BACKEND_URL;
      await set("url", this.url, this.store);
    }

    return this.url;
  }

  async loadUser() {
    const userStr = (await get("user", this.store)) ?? null;
    if (!userStr) return null;

    this.user = JSON.parse(userStr);

    return this.user;
  }

  async save() {
    await set("url", this.url, this.store);
    if (this.accessToken) await set("accessToken", this.accessToken, this.store);
    else await del("accessToken", this.store);

    if (this.expiresAt) await set("expiresAt", this.expiresAt, this.store);
    else await del("expiresAt", this.store);

    if (this.refreshToken) await set("refreshToken", this.refreshToken, this.store);
    else await del("refreshToken", this.store);

    if (this.user) await set("user", JSON.stringify(this.user), this.store);
    else await del("user", this.store);
  }
}

export const apiStore = new ApiStore();

export const get80PercentOfTokenLifespan = (expiresIn: number) => Date.now() + expiresIn * 0.8 * 1000;
