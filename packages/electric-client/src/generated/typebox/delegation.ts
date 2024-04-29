import { Type, Static } from "@sinclair/typebox";

export const delegation = Type.Object({
  createdBy: Type.String(),
  delegatedTo: Type.String(),
});

export type delegationType = Static<typeof delegation>;
