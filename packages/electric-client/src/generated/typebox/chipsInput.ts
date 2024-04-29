import { Type, Static } from "@sinclair/typebox";

export const chipsInput = Type.Object({
  key: Type.String(),
  value: Type.String(),
  udap_id: Type.String(),
  text: Type.String(),
});

export type chipsInputType = Static<typeof chipsInput>;
