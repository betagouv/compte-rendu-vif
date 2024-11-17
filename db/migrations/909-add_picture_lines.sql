CREATE TABLE picture_lines (
    id TEXT PRIMARY KEY,
    "pictureId" TEXT,
    lines TEXT NOT NULL,
    "createdAt" TIMESTAMP
);

ALTER TABLE picture_lines ENABLE ELECTRIC;