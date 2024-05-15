import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { userAndTokenTSchema } from "../services/userService";
import { internal_userInput, userInput } from "@cr-vif/electric-client/typebox";

export const userPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  // @ts-expect-error null / undefined mismatch
  fastify.post("/create-user", { schema: createUserTSchema }, async (request) => {
    const resp = await request.services.user.createUser(request.body);

    return resp;
  });

  // @ts-expect-error null / undefined mismatch
  fastify.post("/login", { schema: loginTSchema }, async (request) => {
    const result = await request.services.user.login(request.body);
    return result;
  });

  // @ts-expect-error null / undefined mismatch
  fastify.get("/verify-token", { schema: verifyTokenTSchema }, async (request) => {
    return request.services.user.verifyJWT(request.query.token);
  });
};

export const createUserTSchema = {
  body: Type.Composite([
    Type.Pick(userInput, ["name", "udap_id"]),
    Type.Pick(internal_userInput, ["email", "password"]),
  ]),
  response: { 200: userAndTokenTSchema },
};
export const loginTSchema = {
  body: Type.Pick(internal_userInput, ["email", "password"]),
  response: { 200: userAndTokenTSchema },
};
export const verifyTokenTSchema = {
  querystring: Type.Object({ token: Type.String() }),
  response: { 200: userAndTokenTSchema },
};
