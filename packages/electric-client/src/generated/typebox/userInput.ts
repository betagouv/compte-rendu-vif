import { Type, Static } from "@sinclair/typebox";

export const userInput = Type.Object({
  email: Type.String(),
  name: Type.String(),
  temporaryLink: Type.Optional(Type.String()),
  temporaryLinkExpiresAt: Type.Optional(Type.String()),
  password: Type.String(),
  udap_id: Type.String(),
  delegation_delegation_createdByTouser: Type.Array(
    Type.Object({
      createdBy: Type.String(),
      delegatedTo: Type.String(),
    })
  ),
  delegation_delegation_delegatedToTouser: Type.Array(
    Type.Object({
      createdBy: Type.String(),
      delegatedTo: Type.String(),
    })
  ),
  udap: Type.Object({
    id: Type.String(),
    department: Type.String(),
    complete_coords: Type.Optional(Type.String()),
    visible: Type.Optional(Type.Boolean()),
    name: Type.Optional(Type.String()),
    address: Type.Optional(Type.String()),
    zip_code: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
  }),
});

export type userInputType = Static<typeof userInput>;
