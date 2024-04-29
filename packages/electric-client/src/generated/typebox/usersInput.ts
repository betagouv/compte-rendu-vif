import { Type, Static } from "@sinclair/typebox";

export const usersInput = Type.Object({
  id: Type.String(),
  email: Type.String(),
  name: Type.String(),
  temporaryLink: Type.Optional(Type.String()),
  temporaryLinkExpiresAt: Type.Optional(Type.String()),
  password: Type.String(),
  udap_id: Type.Optional(Type.String()),
  udaps: Type.Optional(
    Type.Object({
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
    })
  ),
});

export type usersInputType = Static<typeof usersInput>;
