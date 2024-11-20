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

const udap = new Table({
  department: column.text,
  completeCoords: column.text,
  visible: column.integer,
  name: column.text,
  address: column.text,
  zipCode: column.text,
  city: column.text,
  phone: column.text,
  email: column.text,
  marianne_text: column.text,
  drac_text: column.text,
  udap_text: column.text,
});

const user = new Table({
  name: column.text,
  udap_id: column.text,
});

export const AppSchema = new Schema({
  report,
  udap,
  user,
});

export type Database = (typeof AppSchema)["types"];
export type Report = Database["report"];
export type Udap = Database["udap"];
