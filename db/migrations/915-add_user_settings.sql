CREATE TABLE user_settings (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    default_emails TEXT
);

ALTER PUBLICATION powersync ADD TABLE "user_settings";
