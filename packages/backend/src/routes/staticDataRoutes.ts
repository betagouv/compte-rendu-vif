import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { Nullable } from "../services/syncService";

export const staticDataPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.get("/udaps", { schema: getUDAPsTSchema }, async (request) => {
    return request.services.staticData.getUDAPs();
  });
};

export const udapTSchema = Type.Object({
  id: Type.String(),
  department: Type.String(),
  completeCoords: Nullable(Type.String()),
  visible: Nullable(Type.Boolean()),
  name: Nullable(Type.String()),
  address: Nullable(Type.String()),
  zipCode: Nullable(Type.String()),
  city: Nullable(Type.String()),
  phone: Nullable(Type.String()),
  email: Nullable(Type.String()),
  marianne_text: Nullable(Type.String()),
  drac_text: Nullable(Type.String()),
  dept_number: Nullable(Type.String()),
  udap_text: Nullable(Type.String()),
});

export const getUDAPsTSchema = {
  response: { 200: Type.Array(udapTSchema) },
};
