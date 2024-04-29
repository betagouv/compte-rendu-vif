import { Type, Static } from "@sinclair/typebox";

export const delegationInput = Type.Object({
  createdBy: Type.String(),
  delegatedTo: Type.String(),
  user_delegation_createdByTouser: Type.Object({
    email: Type.String(),
    name: Type.String(),
    temporaryLink: Type.Optional(Type.String()),
    temporaryLinkExpiresAt: Type.Optional(Type.String()),
    password: Type.String(),
    udap_id: Type.String(),
  }),
  user_delegation_delegatedToTouser: Type.Object({
    email: Type.String(),
    name: Type.String(),
    temporaryLink: Type.Optional(Type.String()),
    temporaryLinkExpiresAt: Type.Optional(Type.String()),
    password: Type.String(),
    udap_id: Type.String(),
  }),
});

export type delegationInputType = Static<typeof delegationInput>;
