CREATE TABLE user_dept (
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  dept_number TEXT NOT NULL,
  PRIMARY KEY (user_id, dept_number)
);

ALTER PUBLICATION powersync ADD TABLE user_dept;

INSERT INTO "user_dept" (user_id, dept_number)
SELECT u.id, udap.dept_number
FROM "user" u
INNER JOIN udap ON u.udap_id = udap.id;