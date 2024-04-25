import { Type, Static } from "@sinclair/typebox";

export const chip = Type.Object({
  id: Type.String(),
  label: Type.String(),
  value: Type.String(),
  report_to_chip: Type.Array(
    Type.Object({
      id: Type.String(),
      report_id: Type.String(),
      chip_id: Type.String(),
    })
  ),
});

export type chipType = Static<typeof chip>;
