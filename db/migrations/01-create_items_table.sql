CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  password TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "report" (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  redacted_by TEXT NOT NULL,
  created_by_id TEXT NOT NULL,
  meet_date TIMESTAMP NOT NULL,
  meet_link TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  applicant_type TEXT NOT NULL,
  project_status TEXT NOT NULL,
  project_cadastral_ref TEXT NOT NULL,
  project_land_contact TEXT NOT NULL,
  project_space_type TEXT NOT NULL,
  project_nature TEXT NOT NULL,
  project_description TEXT NOT NULL,
  decision TEXT NOT NULL,
  decision_comment TEXT NOT NULL,
  contacts TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
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