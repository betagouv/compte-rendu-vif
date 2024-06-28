import { Type, Static } from "@sinclair/typebox";

export const service_instructeursInput = Type.Object({
  id: Type.Number(),
  full_name: Type.String(),
  short_name: Type.String(),
  email: Type.Optional(Type.String()),
  tel: Type.Optional(Type.String()),
  udap_id: Type.Optional(Type.String()),
});

export type service_instructeursInputType = Static<
  typeof service_instructeursInput
>;
