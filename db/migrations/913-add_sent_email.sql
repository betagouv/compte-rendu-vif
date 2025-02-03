CREATE TABLE sent_email (
    id TEXT PRIMARY KEY,
    report_id TEXT REFERENCES report(id),
    sent_to TEXT NOT NULL,
    sent_at TIMESTAMP NOT NULL,
    udap_id TEXT NOT NULL
);

ALTER PUBLICATION powersync ADD TABLE "sent_email";
