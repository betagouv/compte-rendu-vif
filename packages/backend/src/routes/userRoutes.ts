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
  fastify.get("/refresh-token", { schema: refreshTokenTSchema }, async (request) => {
    return request.services.user.verifyTokenAndRefreshIfNeeded(request.query.token, request.query.refreshToken);
  });

  fastify.post("/send-reset-password", { schema: sendResetPasswordTSchema }, async (request) => {
    return request.services.user.generateResetLink(request.body.email);
  });

  fastify.post("/reset-password", { schema: resetPasswordTSchema }, async (request) => {
    return request.services.user.resetPassword(request.body);
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

export const refreshTokenTSchema = {
  querystring: Type.Object({ token: Type.String(), refreshToken: Type.String() }),
  response: { 200: userAndTokenTSchema },
};

export const sendResetPasswordTSchema = {
  body: Type.Object({ email: Type.String() }),
  response: { 200: Type.Object({ message: Type.String() }) },
};

export const resetPasswordTSchema = {
  body: Type.Object({
    temporaryLink: Type.String(),
    newPassword: Type.String(),
  }),
  response: { 200: Type.Object({ message: Type.String() }) },
};
