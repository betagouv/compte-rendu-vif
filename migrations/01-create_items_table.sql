CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  password TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "report" (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  redactedBy TEXT NOT NULL,
  ownedBy TEXT NOT NULL,
  createdById TEXT NOT NULL,
  meetDate TIMESTAMP NOT NULL,
  meetLink TEXT NOT NULL,
  applicantName TEXT NOT NULL,
  applicantType TEXT NOT NULL,
  projectStatus TEXT NOT NULL,
  projectCadastralRef TEXT NOT NULL,
  projectLandContact TEXT NOT NULL,
  projectSpaceType TEXT NOT NULL,
  projectNature TEXT NOT NULL,
  projectDescription TEXT NOT NULL,
  decision TEXT NOT NULL,
  decisionComment TEXT NOT NULL,
  contacts TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "clause" (
  id TEXT PRIMARY KEY NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "report_to_clause" (
  id TEXT PRIMARY KEY NOT NULL,
  reportId TEXT NOT NULL,
  clauseId TEXT NOT NULL
);

ALTER TABLE
  "report" ENABLE ELECTRIC;

ALTER TABLE
  "report_to_clause" ENABLE ELECTRIC;

ALTER TABLE
  "clause" ENABLE ELECTRIC;