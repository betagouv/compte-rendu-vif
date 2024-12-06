CREATE TABLE IF NOT EXISTS service_instructeurs (
    id TEXT NOT NULL PRIMARY KEY,
    full_name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    email TEXT,
    tel TEXT,
    udap_id TEXT
);

ALTER PUBLICATION powersync ADD TABLE "service_instructeurs";

