CREATE TABLE "pop_images" (
    "id" text PRIMARY KEY NOT NULL,
    "reference" text,
    "url" text,
    "label" text,
    "copyright" text,
    "dept_number" text
);
--> statement-breakpoint
ALTER TABLE "pop_immeubles"
ADD COLUMN "last_image_check_at" timestamp;

UPDATE "pop_immeubles" SET "last_image_check_at" = CURRENT_TIMESTAMP;