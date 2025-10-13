import type { FastifyPluginAsyncTypebox, Static } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { userAndTokenTSchema } from "./tschemas";
import { authenticate } from "./authMiddleware";

export const userPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.post("/change-udap", { schema: changeUdapTSchema, preHandler: authenticate }, async (request) => {
    const { udap_id } = request.body;
    const { id } = request.user!;
    return request.services.user.changeUdap(id, udap_id);
  });
};

export const changeUdapTSchema = {
  body: Type.Object({
    udap_id: Type.String(),
  }),
  response: { 200: Type.Object({ message: Type.String() }) },
};

export const createUserTSchema = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
    name: Type.String(),
    udap_id: Type.String(),
  }),
  response: { 200: userAndTokenTSchema },
};

export const loginTSchema = {
  body: Type.Object({ email: Type.String(), password: Type.String() }),
  response: { 200: userAndTokenTSchema },
};

export const refreshTokenTSchema = {
  querystring: Type.Object({
    token: Type.String(),
    refreshToken: Type.Optional(Type.String()),
  }),
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
