import { Type, Static } from "@sinclair/typebox";

export const chipInput = Type.Object({
  key: Type.String(),
  value: Type.String(),
  udap_id: Type.String(),
  text: Type.String(),
});

export type chipInputType = Static<typeof chipInput>;