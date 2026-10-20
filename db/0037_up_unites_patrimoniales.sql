CREATE TABLE "up_cache" (
	"key" text PRIMARY KEY NOT NULL,
	"payload" text,
	"fetched_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_id" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_identifiant" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_intitule" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_intitule_complet" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_niveau" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_protection" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_type_immeuble" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_monument_identifiant" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "up_chemin" text;--> statement-breakpoint
ALTER TABLE "state_report" ADD COLUMN "rapport_id" text;