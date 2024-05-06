import { Type, Static } from "@sinclair/typebox";

export const whitelist = Type.Object({
  email: Type.String(),
});

export type whitelistType = Static<typeof whitelist>;
