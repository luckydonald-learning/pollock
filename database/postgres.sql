DROP DATABASE IF EXISTS pollshed;
DROP USER  IF EXISTS pollshed;

CREATE USER pollshed WITH CREATEDB ENCRYPTED PASSWORD 'Stay Out Of My Shed';
CREATE DATABASE pollshed WITH OWNER = pollshed;

\connect pollshed;

DROP TABLE IF EXISTS "poll";
DROP TABLE IF EXISTS "polloption";
DROP TABLE IF EXISTS "polltoken";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "vote";
DROP TABLE IF EXISTS "poll_user";
DROP TABLE IF EXISTS "edittoken";

DROP INDEX IF EXISTS "idx_polloption__poll";
DROP INDEX IF EXISTS "idx_polltoken__poll";
DROP INDEX IF EXISTS "idx_poll_user";
DROP INDEX IF EXISTS "idx_vote__owner";
DROP INDEX IF EXISTS "idx_vote__poll";
DROP INDEX IF EXISTS "idx_edittoken__vote";
DROP INDEX IF EXISTS "idx_polloption__vote";

-- https://editor.ponyorm.com/user/luckydonald/Pollock/snapshots/115
-- https://editor.ponyorm.com/user/luckydonald/Pollock/snapshots/115/postgres

CREATE TABLE "poll" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "voices" BIGINT,
  "worst" BOOLEAN,
  "deadline" TIMESTAMP
);

CREATE TABLE "polltoken" (
  "id" SERIAL PRIMARY KEY,
  "admin" UUID UNIQUE NOT NULL,
  "share" UUID UNIQUE NOT NULL,
  "poll" BIGINT NOT NULL
);

CREATE INDEX "idx_polltoken__poll" ON "polltoken" ("poll");

ALTER TABLE "polltoken" ADD CONSTRAINT "fk_polltoken__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id");

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL
);

CREATE TABLE "poll_user" (
  "poll" BIGINT NOT NULL,
  "user" BIGINT NOT NULL,
  PRIMARY KEY ("poll", "user")
);

CREATE INDEX "idx_poll_user" ON "poll_user" ("user");

ALTER TABLE "poll_user" ADD CONSTRAINT "fk_poll_user__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id");

ALTER TABLE "poll_user" ADD CONSTRAINT "fk_poll_user__user" FOREIGN KEY ("user") REFERENCES "user" ("id");

CREATE TABLE "vote" (
  "id" SERIAL PRIMARY KEY,
  "time" TIME NOT NULL,
  "worst" BOOLEAN NOT NULL DEFAULT false,
  "owner" BIGINT NOT NULL,
  "poll" BIGINT NOT NULL
);

CREATE INDEX "idx_vote__owner" ON "vote" ("owner");

CREATE INDEX "idx_vote__poll" ON "vote" ("poll");

ALTER TABLE "vote" ADD CONSTRAINT "fk_vote__owner" FOREIGN KEY ("owner") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "vote" ADD CONSTRAINT "fk_vote__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id") ON DELETE CASCADE;

CREATE TABLE "edittoken" (
  "id" SERIAL PRIMARY KEY,
  "token" UUID UNIQUE NOT NULL,
  "vote" BIGINT NOT NULL
);

CREATE INDEX "idx_edittoken__vote" ON "edittoken" ("vote");

ALTER TABLE "edittoken" ADD CONSTRAINT "fk_edittoken__vote" FOREIGN KEY ("vote") REFERENCES "vote" ("id");

CREATE TABLE "polloption" (
  "id" SERIAL PRIMARY KEY,
  "text" VARCHAR(512) NOT NULL,
  "vote" BIGINT NOT NULL,
  "poll" BIGINT NOT NULL
);

CREATE INDEX "idx_polloption__poll" ON "polloption" ("poll");

CREATE INDEX "idx_polloption__vote" ON "polloption" ("vote");

ALTER TABLE "polloption" ADD CONSTRAINT "fk_polloption__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id") ON DELETE CASCADE;

ALTER TABLE "polloption" ADD CONSTRAINT "fk_polloption__vote" FOREIGN KEY ("vote") REFERENCES "vote" ("id") ON DELETE CASCADE;

-- INSERT TEST DATA
INSERT INTO "poll" ("title", "description", "voices", "worst", "deadline") VALUES ('Favorite Color', 'What is your favorite color?', 0, false, '2023-06-30 23:59:59');
INSERT INTO "poll" ("title", "description", "voices", "worst", "deadline") VALUES ('Best Movie', 'What is the best movie you have ever seen?', 0, false, '2023-07-15 23:59:59');

INSERT INTO "polltoken" ("admin", "share", "poll") VALUES ('4f8401ef-2f2f-4a6d-8c7b-4b392ef0739f', '2a1e0fc0-4be0-480d-b0bc-170729625ca6', 1);
INSERT INTO "polltoken" ("admin", "share", "poll") VALUES ('a8ff771d-68fd-4f22-b70b-61c255430d79', 'bd0e06e4-9505-4175-b9ef-1939d285a84d', 2);

INSERT INTO "user" ("name") VALUES ('John');
INSERT INTO "user" ("name") VALUES ('Emily');

INSERT INTO "poll_user" ("poll", "user") VALUES (1, 1);
INSERT INTO "poll_user" ("poll", "user") VALUES (1, 2);
INSERT INTO "poll_user" ("poll", "user") VALUES (2, 2);

INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('10:30:00', false, 1, 1);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('11:45:00', true, 2, 1);

INSERT INTO "edittoken" ("token", "vote") VALUES ('4b8401ef-2f2f-4a6d-8c7b-4b392ef0739f', 1);
INSERT INTO "edittoken" ("token", "vote") VALUES ('5c8401ef-2f2f-4a6d-8c7b-4b392ef0739f', 2);

INSERT INTO "polloption" ("text", "vote", "poll") VALUES ('Red', 1, 1);
INSERT INTO "polloption" ("text", "vote", "poll") VALUES ('Blue', 1, 1);
