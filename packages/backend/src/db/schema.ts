import { relations } from "drizzle-orm";
import { date, pgTable, serial, text } from "drizzle-orm/pg-core";

// Tables
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdBy: text("createdBy").notNull(),
  meetDate: date("meetDate").notNull(),
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
  contacts: text("contacts").notNull(),
});

export const clauses = pgTable("clauses", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
});

export const reportsToClauses = pgTable("reports_to_clauses", {
  reportId: serial("report_id")
    .notNull()
    .references(() => reports.id),
  clauseId: serial("clause_id")
    .notNull()
    .references(() => clauses.id),
});

// Relations
export const reportRelations = relations(reports, ({ many }) => {
  return {
    clauses: many(clauses),
  };
});

export const clauseRelations = relations(clauses, ({ many }) => {
  return {
    reports: many(reports),
  };
});

export const reportsToClausesRelations = relations(
  reportsToClauses,
  ({ one }) => {
    return {
      report: one(reports, {
        fields: [reportsToClauses.reportId],
        references: [reports.id],
      }),
      clause: one(clauses, {
        fields: [reportsToClauses.clauseId],
        references: [clauses.id],
      }),
    };
  }
);

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
