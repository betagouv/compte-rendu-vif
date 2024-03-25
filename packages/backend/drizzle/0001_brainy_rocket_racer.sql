CREATE TABLE IF NOT EXISTS "reports_to_clauses" (
	"report_id" serial NOT NULL,
	"clause_id" serial NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reports_to_clauses"
ADD CONSTRAINT "reports_to_clauses_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "reports_to_clauses"
ADD CONSTRAINT "reports_to_clauses_clause_id_clauses_id_fk" FOREIGN KEY ("clause_id") REFERENCES "clauses"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "reports" ENABLE ELECTRIC;
ALTER TABLE "clauses" ENABLE ELECTRIC;
ALTER TABLE "reports_to_clauses" ENABLE ELECTRIC;