
CREATE TABLE clause_v2 (
  id       text NOT NULL PRIMARY KEY
  ,key     text NOT NULL 
  ,value   text NOT NULL
  ,udap_id text
  ,text    text NOT NULL
);

ALTER TABLE clause_v2 ENABLE ELECTRIC;