import { ofetch } from "ofetch";
import { type GetEndpoints, type PostEndpoints, createApiClient } from "./api.gen";
import { ENV } from "./envVars";

export const api = createApiClient((method, url, parameters) => {
  const { body, query, header } = parameters || {};

  return ofetch(url, {
    method,
    body: body as any,
    query,
    headers: { ...header, Authorization: ref.token ? `Bearer ${ref.token}` : undefined } as Record<string, string>,
  });
}, ENV.VITE_BACKEND_URL);

const ref = {
  token: null as string | null,
};

export const setToken = (token?: string | null) => {
  ref.token = token ?? null;
};

export type RouterInputs<T extends keyof AllEndpoints> = AllEndpoints[T]["parameters"];
export type RouterOutputs<T extends keyof AllEndpoints> = AllEndpoints[T]["response"];

type AllEndpoints = GetEndpoints & PostEndpoints;
