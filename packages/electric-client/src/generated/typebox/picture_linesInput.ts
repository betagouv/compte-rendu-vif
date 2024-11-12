import { Type, Static } from "@sinclair/typebox";

export const picture_linesInput = Type.Object({
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

export type picture_linesInputType = Static<typeof picture_linesInput>;
