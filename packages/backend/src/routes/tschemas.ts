import { Type } from "@sinclair/typebox";

export const userAndTokenTSchema = Type.Object({
  user: Type.Optional(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      udap_id: Type.String(),
      udap: Type.Any(),
    }),
  ),
  token: Type.String(),
  expiresAt: Type.String(),
  refreshToken: Type.String(),
});
