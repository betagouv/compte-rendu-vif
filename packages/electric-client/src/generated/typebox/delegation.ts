import { Type, Static } from "@sinclair/typebox";

export const delegation = Type.Object({
  createdBy: Type.String(),
  delegatedTo: Type.String(),
  user_delegation_createdByTouser: Type.Object({
    id: Type.String(),
    name: Type.String(),
    udap_id: Type.String(),
  }),
  user_delegation_delegatedToTouser: Type.Object({
    id: Type.String(),
    name: Type.String(),
    udap_id: Type.String(),
  }),
});

export type delegationType = Static<typeof delegation>;
