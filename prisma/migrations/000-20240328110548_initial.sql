-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "redactedBy" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "meetDate" TIMESTAMP(3) NOT NULL,
    "meetLink" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "applicantType" TEXT NOT NULL,
    "projectStatus" TEXT NOT NULL,
    "projectCadastralRef" TEXT NOT NULL,
    "projectLandContact" TEXT NOT NULL,
    "projectSpaceType" TEXT NOT NULL,
    "projectNature" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "decisionComment" TEXT NOT NULL,
    "contacts" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportToClause" (
    "reportId" TEXT NOT NULL,
    "clauseId" TEXT NOT NULL,

    CONSTRAINT "ReportToClause_pkey" PRIMARY KEY ("reportId","clauseId")
);

-- CreateTable
CREATE TABLE "Clause" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Clause_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportToClause" ADD CONSTRAINT "ReportToClause_clauseId_fkey" FOREIGN KEY ("clauseId") REFERENCES "Clause"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportToClause" ADD CONSTRAINT "ReportToClause_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "started_at", "finished_at", "migration_name", "applied_steps_count") VALUES ('812528db-919f-48ee-b491-892ad4b19e03', '64a49277c9f24c835a9ec4fe2d887c6b', '2024-03-28 11:05:50', '2024-03-28 11:05:50', '20240328110548_initial', 1);


ALTER TABLE "Report" ENABLE ELECTRIC;
ALTER TABLE "ReportToClause" ENABLE ELECTRIC;
ALTER TABLE "Clause" ENABLE ELECTRIC;
