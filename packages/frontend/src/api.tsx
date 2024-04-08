import type { AppRouter } from "@cr-vif/backend";

import { treaty } from "@elysiajs/eden";
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { ENV } from "./envVars";

export const api = treaty<AppRouter>(ENV.VITE_BACKEND_URL);

type ApiDef = typeof api;
type RouteKeys = keyof ApiDef;

export type InputOf<Route extends RouteKeys> = Parameters<PostOrGet<Route>>[0];
export type OutputOf<Route extends RouteKeys> = Awaited<ReturnType<PostOrGet<Route>>>;

type PostOrGet<Route extends RouteKeys> = ApiDef[Route] extends { post: any }
  ? ApiDef[Route]["post"]
  : ApiDef[Route] extends { get: any }
    ? ApiDef[Route]["get"]
    : never;

type MutationOptionsWithoutFn = Omit<UseMutationOptions<any, any, any, any>, "mutationFn">;
type QueryOptionsWithoutFn = Omit<UseQueryOptions<any, any, any, any>, "queryFn">;

export const useCreateUserMutation = (options: MutationOptionsWithoutFn = {}) => {
  return useMutation(api["create-user"]["post"], options);
};

export const useLoginMutation = (options: MutationOptionsWithoutFn = {}) => {
  return useMutation(api["login"]["post"], options);
};

export const useVerifyTokenQuery = (token: string, options: QueryOptionsWithoutFn = {}) => {
  return useQuery({
    queryKey: ["verify-token", token],
    queryFn: () => api["verify-token"]["get"]({ query: { token } }),
    refetchOnWindowFocus: false,
    enabled: !!token,
    ...options,
  });
};
