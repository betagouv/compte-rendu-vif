import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const userPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/upload-image", async (request) => {});
};
