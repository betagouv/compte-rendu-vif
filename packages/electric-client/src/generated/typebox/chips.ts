import { Type, Static } from "@sinclair/typebox";

export const chips = Type.Object({
  key: Type.String(),
  value: Type.String(),
  udap_id: Type.String(),
  text: Type.String(),
});

export type chipsType = Static<typeof chips>;
