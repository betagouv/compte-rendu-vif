import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { crudTSchema } from "../services/syncService";

export const syncPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/upload-data", { schema: uploadDataTSchema }, async (request) => {
    return request.services.sync.applyCrud(request.body);
  });
};

const uploadDataTSchema = {
  body: crudTSchema,
  response: { 200: Type.Any() },
};
