
CREATE TABLE "udap"(
   id              TEXT NOT NULL PRIMARY KEY
  ,department      TEXT NOT NULL
  ,"completeCoords" TEXT
  ,visible         BOOLEAN
  ,name            TEXT
  ,address         TEXT
  ,"zipCode"        TEXT 
  ,city            TEXT
  ,phone           TEXT 
  ,email           TEXT
  ,marianne_text   TEXT
    ,drac_text       TEXT
    ,udap_text       TEXT
);

CREATE PUBLICATION powersync FOR TABLE "udap";
    
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
    "id" text PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "udap_id" text NOT NULL REFERENCES "udap"(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "internal_user" (
    "id" text PRIMARY KEY NOT NULL,
    "email" text NOT NULL,
    "role" text NOT NULL,
    "password" text NOT NULL,
    "temporaryLink" text,
    "temporaryLinkExpiresAt" text,
    "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

ALTER PUBLICATION powersync ADD TABLE "user";

CREATE TABLE IF NOT EXISTS "delegation" (
    "createdBy" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "delegatedTo" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    PRIMARY KEY("createdBy", "delegatedTo")
);


ALTER PUBLICATION powersync ADD TABLE "delegation";