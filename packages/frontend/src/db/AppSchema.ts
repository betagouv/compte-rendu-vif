import { Schema, Table, column } from "@powersync/web";

const report = new Table({
  title: column.text,
  projectDescription: column.text,
  redactedBy: column.text,
  meetDate: column.text,
  applicantName: column.text,
  applicantAddress: column.text,
  projectCadastralRef: column.text,
  projectSpaceType: column.text,
  decision: column.text,
  precisions: column.text,
  contacts: column.text,
  furtherInformation: column.text,
  createdBy: column.text,
  createdAt: column.text,
  serviceInstructeur: column.integer,
  pdf: column.text,
  disabled: column.integer,
  udap_id: column.text,
  redactedById: column.text,
  applicantEmail: column.text,
  city: column.text,
  zipCode: column.text,
});

export const AppSchema = new Schema({
  report,
});

export type Database = (typeof AppSchema)["types"];
export type Report = Database["report"];
