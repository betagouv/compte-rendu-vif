CREATE TABLE `clauses` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `delegations` (
	`id` text PRIMARY KEY NOT NULL,
	`createdBy` text NOT NULL,
	`delegatedTo` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`createdBy` text NOT NULL,
	`meetDate` text NOT NULL,
	`meetLink` text,
	`applicantName` text NOT NULL,
	`applicantType` text NOT NULL,
	`projectStatus` text NOT NULL,
	`projectCadastralRef` text NOT NULL,
	`projectLandContact` text NOT NULL,
	`projectSpaceType` text NOT NULL,
	`projectNature` text NOT NULL,
	`projectDescription` text NOT NULL,
	`decision` text NOT NULL,
	`decisionComment` text,
	`goodPractices` text NOT NULL,
	`contacts` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reportsToClauses` (
	`reportId` text NOT NULL,
	`clauseId` text NOT NULL,
	PRIMARY KEY(`clauseId`, `reportId`)
);
