import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { udaps } from "@cr-vif/electric-client/typebox";

export const staticDataPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  // @ts-ignore - null/undefined mismatch
  fastify.get("/udaps", { schema: getUDAPsTSchema }, async (request) => {
    return request.services.staticData.getUDAPs();
  });
};

export const getUDAPsTSchema = {
  response: { 200: Type.Array(Type.Omit(udaps, ["users"])) },
};
