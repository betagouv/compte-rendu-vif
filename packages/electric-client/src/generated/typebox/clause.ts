import { Type, Static } from "@sinclair/typebox";

export const clause = Type.Object({
  key: Type.String(),
  value: Type.String(),
  udap_id: Type.String(),
  text: Type.String(),
  hidden: Type.Optional(Type.Boolean()),
});

export type clauseType = Static<typeof clause>;
