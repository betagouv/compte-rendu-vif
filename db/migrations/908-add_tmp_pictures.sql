CREATE TABLE tmp_pictures (
    id TEXT PRIMARY KEY,
    "reportId" TEXT REFERENCES report(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP
);

ALTER PUBLICATION powersync ADD TABLE "tmp_pictures";
