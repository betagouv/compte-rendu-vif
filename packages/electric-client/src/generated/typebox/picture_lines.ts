import { Type, Static } from "@sinclair/typebox";

export const picture_lines = Type.Object({
  id: Type.String(),
  pictureId: Type.Optional(Type.String()),
  lines: Type.String(),
  createdAt: Type.Optional(Type.String()),
  pictures: Type.Optional(
    Type.Object({
      id: Type.String(),
      reportId: Type.Optional(Type.String()),
      url: Type.Optional(Type.String()),
      createdAt: Type.Optional(Type.String()),
      finalUrl: Type.Optional(Type.String()),
    })
  ),
});

export type picture_linesType = Static<typeof picture_lines>;
