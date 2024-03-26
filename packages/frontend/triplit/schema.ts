import { Schema as S } from '@triplit/db'
import type { ClientSchema, Entity } from '@triplit/client'
/**
 * Define your schema here. To use your schema, you can either:
 * - Directly import your schema into your app
 * - Run 'triplit migrate create' to generate migrations (recommended for production apps)
 *
 * For more information on schemas, see the docs: https://www.triplit.dev/docs/schemas
 */
export const schema = {
  reports: {
    schema: S.Schema({
      id: S.Id(),
      title: S.String(),
      createdBy: S.String(),
      meetDate: S.Date(),
      meetLink: S.Optional(S.String()),
      applicantName: S.String(),
      applicantType: S.String(),
      projectStatus: S.String(),
      projectCadastralRef: S.String(),
      projectLandContact: S.String(),
      projectSpaceType: S.String(),
      projectNature: S.String(),
      projectDescription: S.String(),
      decision: S.String(),
      decisionComment: S.Optional(S.String()),
      goodPractices: S.Set(S.String()),
      contacts: S.Set(S.String()),
      clauseIds: S.Set(S.String()),
      clauses: S.Query({
        collectionName: 'clauses',
        where: [['id', 'in', '$clauseIds']],
      }),
    }),
  },
  clauses: {
    schema: S.Schema({
      id: S.Id(),
      label: S.String(),
      value: S.String(),
    }),
  },
} satisfies ClientSchema

export type Report = Entity<typeof schema, 'reports'>
export type Clause = Entity<typeof schema, 'clauses'>
