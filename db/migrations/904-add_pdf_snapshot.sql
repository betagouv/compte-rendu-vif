CREATE TABLE pdf_snapshot (
    id TEXT PRIMARY KEY,
    report_id TEXT,
    html TEXT,
    report TEXT,
    user_id TEXT
);

ALTER PUBLICATION powersync ADD TABLE "pdf_snapshot";
