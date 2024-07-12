CREATE TABLE pdf_snapshot (
    id TEXT PRIMARY KEY,
    report_id TEXT,
    html TEXT,
    report TEXT,
    user_id TEXT
);

ALTER TABLE pdf_snapshot ENABLE ELECTRIC;