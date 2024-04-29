CREATE TABLE IF NOT EXISTS "report" (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT,
  project_description TEXT,
  redacted_by TEXT,
  meet_date TIMESTAMP,
  applicant_name TEXT,
  applicant_address TEXT,
  project_cadastral_ref TEXT,
  project_space_type TEXT,
  decision TEXT,
  precisions TEXT,
  contacts TEXT,
  further_information TEXT,
  created_by_email TEXT NOT NULL REFERENCES "user"(email) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL,
  service_instructeur TEXT
);

CREATE TABLE IF NOT EXISTS "clause" (
  id TEXT PRIMARY KEY NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "report_to_clause" (
  id TEXT PRIMARY KEY NOT NULL,
  report_id TEXT NOT NULL REFERENCES report(id) ON DELETE CASCADE,
  clause_id TEXT NOT NULL REFERENCES clause(id) ON DELETE CASCADE
);

ALTER TABLE
  "report" ENABLE ELECTRIC;

ALTER TABLE
  "report_to_clause" ENABLE ELECTRIC;

ALTER TABLE
  "clause" ENABLE ELECTRIC;