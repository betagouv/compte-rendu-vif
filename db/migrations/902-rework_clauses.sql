
CREATE TABLE clause_v2 (
  id       text NOT NULL PRIMARY KEY
  ,key     text NOT NULL 
  ,value   text NOT NULL
  ,position    int
  ,udap_id text
  ,text    text NOT NULL
);

ALTER PUBLICATION powersync ADD TABLE "clause_v2";
