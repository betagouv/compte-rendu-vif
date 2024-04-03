import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  temporaryLink: text("temporaryLink"),
  temporaryLinkExpiresAt: text("temporaryLinkExpiresAt"),
  password: text("password").notNull(),
});

export const reportTable = sqliteTable("reports", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  createdBy: text("createdBy").notNull(),
  meetDate: text("meetDate").notNull(),
  meetLink: text("meetLink"),
  applicantName: text("applicantName").notNull(),
  applicantType: text("applicantType").notNull(),
  projectStatus: text("projectStatus").notNull(),
  projectCadastralRef: text("projectCadastralRef").notNull(),
  projectLandContact: text("projectLandContact").notNull(),
  projectSpaceType: text("projectSpaceType").notNull(),
  projectNature: text("projectNature").notNull(),
  projectDescription: text("projectDescription").notNull(),
  decision: text("decision").notNull(),
  decisionComment: text("decisionComment"),
  goodPractices: text("goodPractices").notNull(),
  contacts: text("contacts").notNull(),
});

export const clauseTable = sqliteTable("clauses", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
});

export const delegationTable = sqliteTable("delegations", {
  id: text("id").primaryKey(),
  createdBy: text("createdBy").notNull(),
  delegatedTo: text("delegatedTo").notNull(),
});

export const reportToClauseTable = sqliteTable(
  "reportsToClauses",
  {
    reportId: text("reportId").notNull(),
    clauseId: text("clauseId").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.reportId, t.clauseId] }),
  }),
);

export const reportsToClausesRelation = relations(reportToClauseTable, ({ one }) => ({
  report: one(reportTable, {
    fields: [reportToClauseTable.reportId],
    references: [reportTable.id],
  }),
  clause: one(clauseTable, {
    fields: [reportToClauseTable.clauseId],
    references: [clauseTable.id],
  }),
}));

export const delegationsRelation = relations(delegationTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [delegationTable.createdBy],
    references: [userTable.id],
  }),
  delegatedTo: one(userTable, {
    fields: [delegationTable.delegatedTo],
    references: [userTable.id],
  }),
}));

// a user can have many reports, a report can have many clauses, a user can have many delegations

/**
 * title: S.String(),
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
 */
