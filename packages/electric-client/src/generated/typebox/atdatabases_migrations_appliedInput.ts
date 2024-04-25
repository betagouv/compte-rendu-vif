import { Type, Static } from "@sinclair/typebox";

export const atdatabases_migrations_appliedInput = Type.Object({
  id: Type.Optional(Type.Integer()),
  index: Type.Number(),
  name: Type.String(),
  script: Type.String(),
  applied_at: Type.String(),
  ignored_error: Type.Optional(Type.String()),
  obsolete: Type.Boolean(),
});

export type atdatabases_migrations_appliedInputType = Static<
  typeof atdatabases_migrations_appliedInput
>;
