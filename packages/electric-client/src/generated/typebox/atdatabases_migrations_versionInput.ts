import { Type, Static } from "@sinclair/typebox";

export const atdatabases_migrations_versionInput = Type.Object({
  id: Type.Number(),
  version: Type.Optional(Type.String()),
});

export type atdatabases_migrations_versionInputType = Static<
  typeof atdatabases_migrations_versionInput
>;
