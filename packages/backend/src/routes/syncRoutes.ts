import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { applyCrudBatchTSchema } from "../services/syncService";
import { Type } from "@sinclair/typebox";

export const syncPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/upload-data", { schema: uploadDataTSchema }, async (request) => {
    return request.services.sync.applyCrudBatch(request.body);
  });
};

const uploadDataTSchema = {
  body: Type.Array(applyCrudBatchTSchema),
  response: { 200: Type.Any() },
};
