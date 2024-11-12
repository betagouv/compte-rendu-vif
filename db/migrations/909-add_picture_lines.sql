CREATE TABLE picture_lines (
    id TEXT PRIMARY KEY,
    "pictureId" TEXT REFERENCES pictures(id) ON DELETE CASCADE,
    lines TEXT NOT NULL,
    "createdAt" TIMESTAMP
);

ALTER TABLE picture_lines ENABLE ELECTRIC;