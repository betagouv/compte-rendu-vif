import { Model, Q, appSchema, tableSchema } from '@nozbe/watermelondb'
import { immutableRelation, lazy, relation } from '@nozbe/watermelondb/decorators'

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'reports',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'meetDate', type: 'string' },
        { name: 'meetLink', type: 'string' },
        { name: 'applicantName', type: 'string' },
        { name: 'applicantType', type: 'string' },
        { name: 'projectStatus', type: 'string' },
        { name: 'projectCadastralRef', type: 'string' },
        { name: 'projectLandContact', type: 'string' },
        { name: 'projectSpaceType', type: 'string' },
        { name: 'projectNature', type: 'string' },
        { name: 'projectDescription', type: 'string' },
        { name: 'decision', type: 'string' },
        { name: 'decisionComment', type: 'string' },
        { name: 'goodPractices', type: 'string' },
        { name: 'contacts', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'clauses',
      columns: [
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'reports_to_clauses',
      columns: [
        { name: 'clause_id', type: 'string' },
        { name: 'report_id', type: 'string' },
      ],
    }),
  ],
})

export class Report extends Model {
  static table = 'reports'
  static associations = {
    reports_to_clauses: { type: 'has_many', foreignKey: 'report_id' } as const,
  }

  get clauses() {
    return this.collections.get('clauses').query(Q.on('reports_to_clauses', 'report_id', this.id))
  }
}

export class ReportsToClauses extends Model {
  static table = 'reports_to_clauses'
  static associations = {
    reports: { type: 'belongs_to', key: 'report_id' } as const,
    clauses: { type: 'belongs_to', key: 'clause_id' } as const,
  }

  @immutableRelation('reports', 'report_id') report
  @immutableRelation('clauses', 'clause_id') clause
}

export class Clause extends Model {
  static table = 'clauses'
  static associations = {
    reports_to_clauses: { type: 'has_many', foreignKey: 'clause_id' } as const,
  }
}

/**
 * reports: {
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
        collectionName: "clauses",
        where: [["id", "in", "$clauseIds"]],
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
 */
