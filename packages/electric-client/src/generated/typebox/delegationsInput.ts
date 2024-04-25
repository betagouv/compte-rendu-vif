import { Type, Static } from "@sinclair/typebox";

export const delegationsInput = Type.Object({
  createdBy: Type.String(),
  delegatedTo: Type.String(),
});

export type delegationsInputType = Static<typeof delegationsInput>;
