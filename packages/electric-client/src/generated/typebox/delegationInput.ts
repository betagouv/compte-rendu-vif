import { Type, Static } from "@sinclair/typebox";

export const delegationInput = Type.Object({
  createdBy: Type.String(),
  delegatedTo: Type.String(),
});

export type delegationInputType = Static<typeof delegationInput>;
