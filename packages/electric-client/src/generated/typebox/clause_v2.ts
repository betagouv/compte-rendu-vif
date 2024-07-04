import { Type, Static } from "@sinclair/typebox";

export const clause_v2 = Type.Object({
  id: Type.String(),
  key: Type.String(),
  value: Type.String(),
  position: Type.Optional(Type.Number()),
  udap_id: Type.Optional(Type.String()),
  text: Type.String(),
});

export type clause_v2Type = Static<typeof clause_v2>;
