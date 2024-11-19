
CREATE TABLE clause(
   key     text NOT NULL 
  ,value   text NOT NULL
  ,udap_id text
  ,text    text NOT NULL
  , PRIMARY KEY (key, value, udap_id)
);

ALTER PUBLICATION powersync ADD TABLE "clause";
