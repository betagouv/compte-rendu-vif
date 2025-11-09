CREATE TABLE "visited_section_attachment" (
    "id" text PRIMARY KEY NOT NULL,
    "is_deprecated" boolean,
    "attachment_id" text NOT NULL,
    "visited_section_id" text NOT NULL,
    "label" text,
    "created_at" timestamp,
    "service_id" text
);
--> statement-breakpoint
ALTER TABLE "picture_lines"
RENAME COLUMN "pictureId" TO "attachmentId";
--> statement-breakpoint
ALTER TABLE "picture_lines" ADD COLUMN "table" text NOT NULL;
--> statement-breakpoint
ALTER TABLE "picture_lines" ADD COLUMN "service_id" text;

ALTER PUBLICATION "powersync" ADD TABLE "visited_section_attachment";