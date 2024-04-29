# Monorepo architecture

This app is divided in multiple packages :

- `backend` is responsible for the user authentication, pdf generation and some static data serving
- `frontend` contains the main app logic
- `electric-client` is responsible for generating typescript clients listed down below
  > This package exports .ts files, this means each app using this package will build it using its own rules

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

#### ElectricSQL allows users to be notified when data changes.

To achieve this, every table containing "live" values must be created through the ElectricSQL proxy, with

```sql
ALTER TABLE table ENABLE ELECTRIC;
```

[Electric SQL documentation](https://electric-sql.com/docs)

## Migrations

- Write migrations in `db/migrations/` and electrify tables using `ALTER TABLE table ENABLE ELECTRIC;`
- `pnpm electric:migrate` applys migrations to the proxy db and generate the clients described below

# Clients

Multiple clients are needed for this app to work :

**They all are generated automatically when applying migrations**

- An electric db client used by frontend to query from indexedDB and sync.

  > You can generate it using `pnpm electric-client generate:front`

- A Prisma db client used by backend to query from Postgres
  > You can generate it using `pnpm electric-client generate:back`
- An API client generated using `@fastify/swagger` and `typed-openapi`, used by the frontend to query the backend
  > You can generate it using `pnpm client:generate`

# Scripts

- `clearDb.sh` clears postgres db
- `frontend/createEnvFile.ts` used in prod to inject env vars starting with VITE\_ at runtime
- `frontend/generatePandaDS.ts` used in dev to generate [PandaCSS](https://panda-css.com/docs/theming/tokens) tokens
  from [DSFR](https://github.com/GouvernementFR/dsfr)
- `electric-client/completePrismaClient.ts` resolves an issue with prisma not being properly typed
