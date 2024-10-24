import { Type, Static } from "@sinclair/typebox";

export const internal_userInput = Type.Object({
  id: Type.String(),
  email: Type.String(),
  role: Type.String(),
  password: Type.String(),
  temporaryLink: Type.Optional(Type.String()),
  temporaryLinkExpiresAt: Type.Optional(Type.String()),
  userId: Type.String(),
  user: Type.Object({
    id: Type.String(),
    name: Type.String(),
    udap_id: Type.String(),
  }),
});

export type internal_userInputType = Static<typeof internal_userInput>;
