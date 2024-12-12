import { ofetch } from "ofetch";
import { type GetEndpoints, type PostEndpoints, createApiClient } from "./api.gen";
import { ENV } from "./envVars";

import { createStore, get, set } from "idb-keyval";
import { getTokenOrRefresh } from "./db/Connector";

export const apiStore = createStore("auth", "access");

export const createApiClientWithUrl = (url: string, ignoreToken?: boolean) => {
  return createApiClient(async (method, url, parameters) => {
    const { body, query, header } = parameters || {};

    let token;
    if (!ignoreToken && ref.token) {
      token = await getTokenOrRefresh();
    }

    return ofetch(url, {
      method,
      body: body as any,
      query,
      headers: { ...header, Authorization: token ? `Bearer ${token}` : undefined } as Record<string, string>,
    });
  }, url);
};

export const api = createApiClientWithUrl(ENV.VITE_BACKEND_URL);
export const unauthenticatedApi = createApiClientWithUrl(ENV.VITE_BACKEND_URL, true);
set("url", ENV.VITE_BACKEND_URL, apiStore);
const ref = {
  token: null as string | null,
};

export const setToken = (token?: string | null) => {
  ref.token = token ?? null;

  set("token", token, apiStore);
};

export const getTokenFromIdb = async () => {
  return get("token", apiStore);
};

export type RouterInputs<T extends keyof AllEndpoints> = AllEndpoints[T]["parameters"];
export type RouterOutputs<T extends keyof AllEndpoints> = AllEndpoints[T]["response"];

type AllEndpoints = GetEndpoints & PostEndpoints;

export const getErrorMessage = (error: any) => {
  return error?.data?.error ?? "Une erreur est survenue, veuillez réessayer plus tard";
};
