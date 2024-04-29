
CREATE TABLE "udap"(
   id              TEXT NOT NULL PRIMARY KEY
  ,department      TEXT NOT NULL
  ,complete_coords TEXT
  ,visible         BOOLEAN
  ,name            TEXT
  ,address         TEXT
  ,zip_code        TEXT 
  ,city            TEXT
  ,phone           TEXT 
  ,email           TEXT
);

ALTER TABLE "udap" ENABLE ELECTRIC;
    
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
    "email" text PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "temporaryLink" text,
    "temporaryLinkExpiresAt" text,
    "password" text NOT NULL,
    "udap_id" text NOT NULL REFERENCES "udap"(id) ON DELETE SET NULL
);

ALTER TABLE "user" ENABLE ELECTRIC;

CREATE TABLE IF NOT EXISTS "delegation" (
    "createdBy" text NOT NULL REFERENCES "user"(email) ON DELETE CASCADE,
    "delegatedTo" text NOT NULL REFERENCES "user"(email) ON DELETE CASCADE,
    PRIMARY KEY("createdBy", "delegatedTo")
);


ALTER TABLE "delegation" ENABLE ELECTRIC;