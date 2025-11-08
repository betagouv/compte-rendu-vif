CREATE TABLE "report_attachment" (
    "id" text PRIMARY KEY NOT NULL,
    "is_deprecated" boolean,
    "attachment_id" text NOT NULL,
    "report_id" text NOT NULL,
    "created_at" timestamp,
    "service_id" text
);
--> statement-breakpoint
CREATE TABLE "state_report_attachment" (
    "id" text PRIMARY KEY NOT NULL,
    "is_deprecated" boolean,
    "attachment_id" text NOT NULL,
    "state_report_id" text NOT NULL,
    "created_at" timestamp,
    "label" text,
    "service_id" text
);
--> statement-breakpoint
DROP TABLE "tmp_pictures" CASCADE;
--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "attachment_id" text;
--> statement-breakpoint
ALTER TABLE "internal_user" DROP COLUMN "password";

ALTER PUBLICATION "powersync"
ADD
TABLE "report_attachment",
"state_report_attachment";