import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { keycloakTokenResponseTSchema } from "../services/authService";

export const authPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/authenticate", { schema: authenticateTSchema }, async (request) => {
    return request.services.auth.authenticate(request.body);
  });
};

export const authenticateTSchema = {
  body: Type.Object({
    code: Type.String(),
  }),
  response: {
    200: keycloakTokenResponseTSchema,
  },
};
