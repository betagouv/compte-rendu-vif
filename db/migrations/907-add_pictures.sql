CREATE TABLE pictures (
    id TEXT PRIMARY KEY,
    data BYTEA,
    url TEXT,
    "createdAt" TIMESTAMP
);

ALTER TABLE pictures ENABLE ELECTRIC;