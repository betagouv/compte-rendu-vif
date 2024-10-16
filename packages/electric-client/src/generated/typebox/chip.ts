import { Type, Static } from "@sinclair/typebox";

export const chip = Type.Object({
  key: Type.String(),
  value: Type.String(),
  udap_id: Type.String(),
  text: Type.String(),
});

export type chipType = Static<typeof chip>;
