CREATE TABLE suggested_email (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    udap_id TEXT NOT NULL
);

ALTER PUBLICATION powersync ADD TABLE "suggested_email";
