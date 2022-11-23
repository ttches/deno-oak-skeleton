CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS character_abilities (
  id serial PRIMARY KEY,
  ability_id integer REFERENCES abilities (id),
  character_id UUID REFERENCES characters (id)
);

COPY character_abilities
(
	id,
  ability_id,
  character_id
)
FROM '/docker-entrypoint-initdb.d/character_abilities.csv'
DELIMITER ','
CSV HEADER;