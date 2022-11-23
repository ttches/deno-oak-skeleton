CREATE TABLE IF NOT EXISTS users (
	id serial PRIMARY KEY,
  auth_id VARCHAR(50) UNIQUE,
	email VARCHAR (255) UNIQUE,
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  last_login TIMESTAMP DEFAULT NOW()
);