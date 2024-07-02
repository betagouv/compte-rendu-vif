
CREATE TABLE clause(
   key     text NOT NULL 
  ,value   text NOT NULL
  ,udap_id text
  ,text    text NOT NULL
  ,hidden  boolean
  , PRIMARY KEY (key, value, udap_id)
);

ALTER TABLE clause ENABLE ELECTRIC;