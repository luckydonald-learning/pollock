DROP DATABASE IF EXISTS pollshed;
DROP USER  IF EXISTS pollshed;

CREATE USER pollshed WITH CREATEDB ENCRYPTED PASSWORD 'Stay Out Of My Shed';
CREATE DATABASE pollshed WITH OWNER = pollshed;

\connect pollshed;

DROP INDEX IF EXISTS "idx_poll_user";
DROP TABLE IF EXISTS "poll_user";
DROP INDEX IF EXISTS "idx_option__poll";
DROP INDEX IF EXISTS "idx_option__fixed_in_poll";
DROP TABLE IF EXISTS "option";
DROP INDEX IF EXISTS "idx_poll__owner";
DROP TABLE IF EXISTS "poll";
DROP TABLE IF EXISTS "user";



CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "poll" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "voices" BIGINT,
  "worst" BOOLEAN,
  "deadline" TIMESTAMP,
  "owner" INTEGER NOT NULL,
  "visible_to_all" BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX "idx_poll__owner" ON "poll" ("owner");

ALTER TABLE "poll" ADD CONSTRAINT "fk_poll__owner" FOREIGN KEY ("owner") REFERENCES "user" ("id") ON DELETE CASCADE;

CREATE TABLE "option" (
  "id" SERIAL PRIMARY KEY,
  "text" TEXT NOT NULL,
  "poll" INTEGER NOT NULL,
  "fixed_in_poll" INTEGER
);

CREATE INDEX "idx_option__fixed_in_poll" ON "option" ("fixed_in_poll");

CREATE INDEX "idx_option__poll" ON "option" ("poll");

ALTER TABLE "option" ADD CONSTRAINT "fk_option__fixed_in_poll" FOREIGN KEY ("fixed_in_poll") REFERENCES "poll" ("id") ON DELETE SET NULL;

ALTER TABLE "option" ADD CONSTRAINT "fk_option__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id") ON DELETE CASCADE;

CREATE TABLE "poll_user" (
  "poll" INTEGER NOT NULL,
  "user" INTEGER NOT NULL,
  PRIMARY KEY ("poll", "user")
);

CREATE INDEX "idx_poll_user" ON "poll_user" ("user");

ALTER TABLE "poll_user" ADD CONSTRAINT "fk_poll_user__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id");

ALTER TABLE "poll_user" ADD CONSTRAINT "fk_poll_user__user" FOREIGN KEY ("user") REFERENCES "user" ("id")
