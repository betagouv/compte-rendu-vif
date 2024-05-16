CREATE TABLE IF NOT EXISTS "report" (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT,
  "projectDescription" TEXT,
  "redactedBy" TEXT,
  "meetDate" TIMESTAMP,
  "applicantName" TEXT,
  "applicantAddress" TEXT,
  "projectCadastralRef" TEXT,
  "projectSpaceType" TEXT,
  decision TEXT,
  precisions TEXT,
  contacts TEXT,
  "furtherInformation" TEXT,
  "createdBy" TEXT NOT NULL REFERENCES "user"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "serviceInstructeur" INT,
  "pdf" TEXT,
  "disabled" BOOLEAN,
  "udap_id" TEXT
);

CREATE TABLE IF NOT EXISTS "clause" (
  id TEXT PRIMARY KEY NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "report_to_clause" (
  id TEXT PRIMARY KEY NOT NULL,
  "reportId" TEXT NOT NULL REFERENCES report(id) ON DELETE CASCADE,
  "clauseId" TEXT NOT NULL REFERENCES clause(id) ON DELETE CASCADE
);

ALTER TABLE
  "report" ENABLE ELECTRIC;

ALTER TABLE
  "report_to_clause" ENABLE ELECTRIC;

ALTER TABLE
  "clause" ENABLE ELECTRIC;