CREATE TABLE IF NOT EXISTS "delegations" (
	"id" text PRIMARY KEY NOT NULL,
	"createdBy" text NOT NULL,
	"delegatedTo" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"temporaryLink" text,
	"temporaryLinkExpiresAt" text,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
