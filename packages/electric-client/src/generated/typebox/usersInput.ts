import { Type, Static } from "@sinclair/typebox";

export const usersInput = Type.Object({
  id: Type.String(),
  email: Type.String(),
  name: Type.String(),
  temporaryLink: Type.Optional(Type.String()),
  temporaryLinkExpiresAt: Type.Optional(Type.String()),
  password: Type.String(),
});

export type usersInputType = Static<typeof usersInput>;
