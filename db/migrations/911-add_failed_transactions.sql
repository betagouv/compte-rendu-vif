CREATE TABLE IF NOT EXISTS failed_transactions (
    id TEXT PRIMARY KEY,
    op_id INTEGER NOT NULL,
    tx_id INTEGER,
    entity_id TEXT NOT NULL,
    type TEXT NOT NULL,
    op TEXT NOT NULL,
    data TEXT,
    user_id TEXT NOT NULL
);

ALTER PUBLICATION powersync ADD TABLE "failed_transactions";
