import { ofetch } from "ofetch";
import { Endpoints, createApiClient } from "./api.gen";
import { ENV } from "./envVars";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export const api = createApiClient((method, url, parameters) => {
  const { body, query, header } = parameters || {};

  return ofetch(url, {
    method,
    body: body as any,
    query,
    headers: header as Record<string, string>,
  });
}, ENV.VITE_BACKEND_URL);
