import { Type, Static } from "@sinclair/typebox";

export const whitelistInput = Type.Object({
  email: Type.String(),
});

export type whitelistInputType = Static<typeof whitelistInput>;
