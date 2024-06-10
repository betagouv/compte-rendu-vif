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


ALTER TABLE
  "report" ENABLE ELECTRIC;
