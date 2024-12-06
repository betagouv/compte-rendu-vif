CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    op_id INTEGER NOT NULL,
    tx_id INTEGER,
    entity_id TEXT NOT NULL,
    type TEXT NOT NULL,
    op TEXT NOT NULL,
    data TEXT,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP,
    error TEXT
);

ALTER PUBLICATION powersync ADD TABLE "transactions";
