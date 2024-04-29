CREATE TABLE IF NOT EXISTS "delegation" (
    "createdBy" text NOT NULL,
    "delegatedTo" text NOT NULL,
    CONSTRAINT "delegation_createdBy_delegatedTo_pk" PRIMARY KEY("createdBy", "delegatedTo")
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
    "id" text PRIMARY KEY NOT NULL,
    "email" text NOT NULL,
    "name" text NOT NULL,
    "temporaryLink" text,
    "temporaryLinkExpiresAt" text,
    "password" text NOT NULL,
    CONSTRAINT "user_email_unique" UNIQUE("email")
);