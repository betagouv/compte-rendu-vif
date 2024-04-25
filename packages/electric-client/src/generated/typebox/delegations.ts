import { Type, Static } from "@sinclair/typebox";

export const delegations = Type.Object({
  createdBy: Type.String(),
  delegatedTo: Type.String(),
});

export type delegationsType = Static<typeof delegations>;
