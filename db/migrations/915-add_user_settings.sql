CREATE TABLE user_settings (
    user_id TEXT PRIMARY KEY,
    default_emails TEXT
);

ALTER PUBLICATION powersync ADD TABLE "user_settings";
