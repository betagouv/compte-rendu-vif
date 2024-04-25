import { Type, Static } from "@sinclair/typebox";

export const clauseInput = Type.Object({
  id: Type.String(),
  label: Type.String(),
  value: Type.String(),
  report_to_clause: Type.Array(
    Type.Object({
      id: Type.String(),
      report_id: Type.String(),
      clause_id: Type.String(),
    })
  ),
});

export type clauseInputType = Static<typeof clauseInput>;
