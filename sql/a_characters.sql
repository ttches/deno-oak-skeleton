CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS characters (
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
	description VARCHAR(250),
  image VARCHAR(200),
  created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  opened_on TIMESTAMP
);

COPY characters
(
  name,
	id
)
FROM '/docker-entrypoint-initdb.d/characters.csv'
DELIMITER ','
CSV HEADER;