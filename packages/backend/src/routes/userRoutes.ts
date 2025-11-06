import type { FastifyPluginAsyncTypebox, Static } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { authenticate } from "./authMiddleware";

export const userPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/change-service", { schema: changeServiceTSchema, preHandler: authenticate }, async (request) => {
    const { service_id } = request.body;
    const { id } = request.user!;
    return request.services.user.changeService(id, service_id);
  });
};

export const changeServiceTSchema = {
  body: Type.Object({
    service_id: Type.String(),
  }),
  response: { 200: Type.Object({ message: Type.String() }) },
};
