# Monorepo architecture

This app is divided in multiple packages :

- `backend` is responsible for the user authentication, pdf generation and some static data serving
- `frontend` contains the main app logic

# DB Workflow

```mermaid
erDiagram
    chip {
        text key PK
        text text
        text udap_id PK
        text value PK
    }

    clause {
        text id PK
        text label
        text value
    }

    delegation {
        text createdBy PK,FK
        text delegatedTo PK,FK
    }

    report {
        text applicantAddress
        text applicantName
        text contacts
        timestamp_without_time_zone createdAt
        text createdByEmail FK
        text decision
        text furtherInformation
        text id PK
        timestamp_without_time_zone meetDate
        text precisions
        text projectCadastralRef
        text projectDescription
        text projectSpaceType
        text redactedBy
        text serviceInstructeur
        text title
    }

    report_to_clause {
        text clauseId FK
        text id PK
        text reportId FK
    }

    udap {
        text address
        text city
        text completeCoords
        text department
        text email
        text id PK
        text name
        text phone
        boolean visible
        text zipCode
    }

    user {
        text email PK
        text name
        text password
        text temporaryLink
        text temporaryLinkExpiresAt
        text udap_id FK
    }

    report_to_clause }o--|| clause : "clauseId"
    delegation }o--|| user : "createdBy"
    delegation }o--|| user : "delegatedTo"
    report }o--|| user : "createdByEmail"
    report_to_clause }o--|| report : "reportId"
    user }o--|| udap : "udap_id"

```

## Live data

#### PowerSync allows users to be notified when data changes.

To achieve this, every table containing live values must be part of the "powersync" publication.

```sql
ALTER PUBLICATION powersync ADD TABLE "table";
```

[PowerSync documentation](https://docs.powersync.com/intro/powersync-overview)

## Migrations

- Write SQL migrations in `db/migrations/`
- `pnpm migration:up`

# DB Clients

- Both packages use [Kysely](https://kysely.dev/)
- `pnpm backend pull-types` generated a single .d.ts file describing the database structure
- `frontend/src/db/AppSchema.ts` contains the schema that will be used against indexed-db
  > It is quite similar to the generated .d.ts file except it uses SQLite types (so TIMESTAMP or JSONB becomes TEXT)

# Scripts

- `clearDb.sh` clears postgres db
- `frontend/createEnvFile.ts` used in prod to inject env vars starting with VITE\_ at runtime
- `frontend/generatePandaDS.ts` used in dev to generate [PandaCSS](https://panda-css.com/docs/theming/tokens) tokens
  from [DSFR](https://github.com/GouvernementFR/dsfr)
