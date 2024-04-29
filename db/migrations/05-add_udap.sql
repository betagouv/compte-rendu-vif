CREATE TABLE IF NOT EXISTS "udaps" (
    "id" text PRIMARY KEY NOT NULL,
    "department" text NOT NULL,
    "complete_coords" text,
    "address" text,
    "visible" boolean,
    "name" text,
    "zip_code" integer,
    "city" text,
    "phone" text,
    "email" text
);

ALTER TABLE "users" ADD COLUMN "udap_id" text;

ALTER TABLE "users" ADD CONSTRAINT "fk_udap_id"
    FOREIGN KEY ("udap_id")
    REFERENCES "udaps" ("id")
    ON DELETE SET NULL;