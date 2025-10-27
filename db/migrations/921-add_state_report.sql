CREATE TABLE "state_report" (
    id TEXT NOT NULL PRIMARY KEY,
    nature_edifice TEXT,
    reference_pop TEXT,
    adresse TEXT,
    commune TEXT,
    code_postal TEXT,
    commune_historique TEXT,
    reference_cadastrale TEXT,
    periode_construction TEXT,
    nature_protection TEXT,
    parties_protegees TEXT,
    description TEXT,
    observations TEXT
);

ALTER PUBLICATION powersync ADD TABLE "state_report";