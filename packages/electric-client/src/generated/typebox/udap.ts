import { Type, Static } from "@sinclair/typebox";

export const udap = Type.Object({
  id: Type.String(),
  department: Type.String(),
  completeCoords: Type.Optional(Type.String()),
  visible: Type.Optional(Type.Boolean()),
  name: Type.Optional(Type.String()),
  address: Type.Optional(Type.String()),
  zipCode: Type.Optional(Type.String()),
  city: Type.Optional(Type.String()),
  phone: Type.Optional(Type.String()),
  email: Type.Optional(Type.String()),
  marianne_text: Type.Optional(Type.String()),
  drac_text: Type.Optional(Type.String()),
  udap_text: Type.Optional(Type.String()),
  user: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      udap_id: Type.String(),
    })
  ),
});

export type udapType = Static<typeof udap>;
