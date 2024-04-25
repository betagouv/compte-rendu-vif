import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { serializedUserTSchema, userAndTokenTSchema } from "../services/userService";
import { usersInput } from "@cr-vif/electric-client/typebox";

export const userPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/create-user", { schema: createUserTSchema }, async (request) => {
    return request.services.user.createUser(request.body);
  });

  fastify.post("/login", { schema: loginTSchema }, async (request) => {
    return request.services.user.login(request.body);
  });

  fastify.get("/verify-token", { schema: verifyTokenTSchema }, async (request) => {
    return request.services.user.verifyJWT(request.query.token);
  });
};

export const createUserTSchema = {
  body: Type.Pick(usersInput, ["name", "email", "password"]),
  response: { 200: userAndTokenTSchema },
};
export const loginTSchema = {
  body: Type.Pick(usersInput, ["email", "password"]),
  response: { 200: userAndTokenTSchema },
};
export const verifyTokenTSchema = {
  querystring: Type.Object({ token: Type.String() }),
  response: { 200: serializedUserTSchema },
};
