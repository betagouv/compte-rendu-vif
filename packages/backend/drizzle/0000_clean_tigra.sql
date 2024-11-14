CREATE TABLE IF NOT EXISTS "report" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "changes" (
	"table" text,
	"id" text,
	"change" text,
	"date" text,
	"user" text,
	CONSTRAINT "changes_id_table_pk" PRIMARY KEY("id","table")
);
