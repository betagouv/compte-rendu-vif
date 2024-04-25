import { Type, Static } from "@sinclair/typebox";

export const atdatabases_migrations_version = Type.Object({
  id: Type.Number(),
  version: Type.Optional(Type.String()),
});

export type atdatabases_migrations_versionType = Static<
  typeof atdatabases_migrations_version
>;
