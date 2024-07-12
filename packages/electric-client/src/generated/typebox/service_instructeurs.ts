import { Type, Static } from "@sinclair/typebox";

export const service_instructeurs = Type.Object({
  id: Type.Number(),
  full_name: Type.String(),
  short_name: Type.String(),
  email: Type.Optional(Type.String()),
  tel: Type.Optional(Type.String()),
  udap_id: Type.Optional(Type.String()),
});

export type service_instructeursType = Static<typeof service_instructeurs>;
