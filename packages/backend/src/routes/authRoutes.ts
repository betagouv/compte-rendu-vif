import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { keycloakTokenResponseTSchema, userTSchema } from "../services/authService";

export const authPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/authenticate", { schema: authenticateTSchema }, async (request) => {
    return request.services.auth.authenticate(request.body);
  });

  fastify.post("/refresh-token", { schema: refreshTokenTSchema }, async (request) => {
    return request.services.auth.refreshToken(request.body.refreshToken);
  });
};

export const authenticateTSchema = {
  body: Type.Object({
    code: Type.String(),
  }),
  response: {
    200: Type.Object({ tokens: keycloakTokenResponseTSchema, user: userTSchema }),
  },
};

export const refreshTokenTSchema = {
  body: Type.Object({
    refreshToken: Type.String(),
  }),
  response: { 200: keycloakTokenResponseTSchema },
};
