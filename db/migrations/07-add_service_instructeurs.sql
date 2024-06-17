CREATE TABLE IF NOT EXISTS service_instructeurs (
    id INTEGER NOT NULL PRIMARY KEY,
    full_name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    email TEXT,
    tel TEXT,
    udap_id TEXT
);


ALTER TABLE service_instructeurs ENABLE ELECTRIC;
