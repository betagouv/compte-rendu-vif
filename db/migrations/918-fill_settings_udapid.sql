UPDATE user_settings
SET udap_id = u.udap_id
FROM "user" u
WHERE user_settings.user_id = u.id;