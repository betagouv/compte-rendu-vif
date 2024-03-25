CREATE TABLE IF NOT EXISTS "clauses" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"createdBy" text NOT NULL,
	"meetDate" date NOT NULL,
	"meetLink" text,
	"applicantName" text NOT NULL,
	"applicantType" text NOT NULL,
	"projectStatus" text NOT NULL,
	"projectCadastralRef" text NOT NULL,
	"projectLandContact" text NOT NULL,
	"projectSpaceType" text NOT NULL,
	"projectNature" text NOT NULL,
	"projectDescription" text NOT NULL,
	"decision" text NOT NULL,
	"decisionComment" text,
	"contacts" text NOT NULL
);
