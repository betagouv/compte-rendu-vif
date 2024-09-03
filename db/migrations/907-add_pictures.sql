CREATE TABLE pictures (
    id TEXT PRIMARY KEY,
    "reportId" TEXT REFERENCES report(id) ON DELETE CASCADE,
    data BYTEA,
    url TEXT,
    "createdAt" TIMESTAMP
);

ALTER TABLE pictures ENABLE ELECTRIC;