CREATE TABLE picture_lines (
    id TEXT PRIMARY KEY,
    "pictureId" TEXT,
    lines TEXT NOT NULL,
    "createdAt" TIMESTAMP
);

ALTER PUBLICATION powersync ADD TABLE "picture_lines";
