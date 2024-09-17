import { Type, Static } from "@sinclair/typebox";

export const pdf_snapshot = Type.Object({
  id: Type.String(),
  report_id: Type.Optional(Type.String()),
  html: Type.Optional(Type.String()),
  report: Type.Optional(Type.String()),
  user_id: Type.Optional(Type.String()),
});

export type pdf_snapshotType = Static<typeof pdf_snapshot>;
