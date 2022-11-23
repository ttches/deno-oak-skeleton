CREATE TABLE IF NOT EXISTS abilities (
  id serial PRIMARY KEY,
  name VARCHAR(60),
  level SMALLINT
);

COPY abilities
(
id,
name,
level
)
FROM '/docker-entrypoint-initdb.d/abilities.csv'
DELIMITER ','
CSV HEADER;