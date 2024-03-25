CREATE TABLE IF NOT EXISTS "clauses" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reports" (
	"id" text PRIMARY KEY NOT NULL,
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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reports_to_clauses" (
	"report_id" text NOT NULL,
	"clause_id" text NOT NULL,
	CONSTRAINT "reports_to_clauses_report_id_clause_id_pk" PRIMARY KEY("report_id", "clause_id")
);
--> statement-breakpoint
ALTER TABLE "reports_to_clauses"
ADD CONSTRAINT "reports_to_clauses_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "reports_to_clauses"
ADD CONSTRAINT "reports_to_clauses_clause_id_clauses_id_fk" FOREIGN KEY ("clause_id") REFERENCES "clauses"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "clauses" ENABLE ELECTRIC;
ALTER TABLE "reports" ENABLE ELECTRIC;
ALTER TABLE "reports_to_clauses" ENABLE ELECTRIC;