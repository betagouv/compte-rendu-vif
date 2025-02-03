CREATE TABLE suggested_email (
    email TEXT PRIMARY KEY,
    udap_id TEXT NOT NULL
);

ALTER PUBLICATION powersync ADD TABLE "suggested_email";
