CREATE TABLE IF NOT EXISTS "delegations" (
    "createdBy" text NOT NULL,
    "delegatedTo" text NOT NULL,
    CONSTRAINT "delegations_createdBy_delegatedTo_pk" PRIMARY KEY("createdBy", "delegatedTo")
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