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
  serviceInstructeur: column.text,
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
  dept_number: column.text,
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
  demarches_simplifiees_url: column.text,
});

const user = new Table({
  name: column.text,
  udap_id: column.text,
});

const delegation = new Table({
  createdBy: column.text,
  delegatedTo: column.text,
});

const pdf_snapshot = new Table({
  report_id: column.text,
  html: column.text,
  report: column.text,
  user_id: column.text,
});

const service_instructeurs = new Table({
  full_name: column.text,
  short_name: column.text,
  email: column.text,
  tel: column.text,
  udap_id: column.text,
});

const clause_v2 = new Table({
  key: column.text,
  value: column.text,
  position: column.integer,
  udap_id: column.text,
  text: column.text,
});

const pictures = new Table({
  reportId: column.text,
  url: column.text,
  createdAt: column.text,
  finalUrl: column.text,
});

const picture_lines = new Table({
  pictureId: column.text,
  lines: column.text,
  createdAt: column.text,
});

const transactions = new Table({
  id: column.text,
  entity_id: column.text,
  type: column.text,
  op_id: column.text,
  tx_id: column.text,
  data: column.text,
  op: column.text,
  user_id: column.text,
});

const sent_email = new Table({
  id: column.text,
  report_id: column.text,
  sent_to: column.text,
  sent_at: column.text,
});

const suggested_email = new Table({
  email: column.text,
  udap_id: column.text,
});

const user_settings = new Table({
  user_id: column.text,
  default_emails: column.text,
  udap_id: column.text,
});

export const AppSchema = new Schema({
  report,
  udap,
  user,
  delegation,
  pdf_snapshot,
  service_instructeurs,
  clause_v2,
  pictures,
  picture_lines,
  transactions,
  sent_email,
  suggested_email,
  user_settings,
});

export type Database = (typeof AppSchema)["types"];
export type Report = Database["report"];
export type Udap = Database["udap"];
export type User = Database["user"];
export type Delegation = Database["delegation"];
export type PdfSnapshot = Database["pdf_snapshot"];
export type ServiceInstructeurs = Database["service_instructeurs"];
export type Clause_v2 = Database["clause_v2"];
export type Pictures = Database["pictures"];
export type PictureLines = Database["picture_lines"];
export type Transactions = Database["transactions"];
export type SentEmail = Database["sent_email"];
export type SuggestedEmail = Database["suggested_email"];
export type UserSettings = Database["user_settings"];
