CREATE TABLE pictures (
    id TEXT PRIMARY KEY,
    "reportId" TEXT REFERENCES report(id) ON DELETE CASCADE,
    url TEXT,
    "createdAt" TIMESTAMP
);

ALTER PUBLICATION powersync ADD TABLE "pictures";
