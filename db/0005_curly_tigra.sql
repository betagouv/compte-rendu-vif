CREATE TABLE "state_report_sent_email" (
	"id" text PRIMARY KEY NOT NULL,
	"state_report_id" text,
	"sent_to" text NOT NULL,
	"sent_at" timestamp NOT NULL,
	"service_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "attachment_id" text;--> statement-breakpoint
ALTER TABLE "state_report_sent_email" ADD CONSTRAINT "state_report_sent_email_state_report_id_fkey" FOREIGN KEY ("state_report_id") REFERENCES "public"."state_report"("id") ON DELETE no action ON UPDATE no action;