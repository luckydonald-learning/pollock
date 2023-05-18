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

CREATE TABLE "polloption" (
  "id" SERIAL PRIMARY KEY,
  "text" VARCHAR(512) NOT NULL,
  "poll" BIGINT NOT NULL,
  "fixed" BOOLEAN DEFAULT FALSE
);

CREATE INDEX "idx_polloption__poll" ON "polloption" ("poll");

ALTER TABLE "polloption" ADD CONSTRAINT "fk_polloption__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id") ON DELETE CASCADE;

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
  "token" UUID UNIQUE NOT NULL,
  "vote" BIGINT NOT NULL
);

CREATE INDEX "idx_edittoken__vote" ON "edittoken" ("vote");

ALTER TABLE "edittoken" ADD CONSTRAINT "fk_edittoken__vote" FOREIGN KEY ("vote") REFERENCES "vote" ("id");

CREATE TABLE "polloption_vote" (
  "polloption" BIGINT NOT NULL,
  "vote" BIGINT NOT NULL,
  PRIMARY KEY ("polloption", "vote")
);

CREATE INDEX "idx_polloption_vote" ON "polloption_vote" ("vote");

ALTER TABLE "polloption_vote" ADD CONSTRAINT "fk_polloption_vote__polloption" FOREIGN KEY ("polloption") REFERENCES "polloption" ("id");

ALTER TABLE "polloption_vote" ADD CONSTRAINT "fk_polloption_vote__vote" FOREIGN KEY ("vote") REFERENCES "vote" ("id");
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

CREATE TABLE "polloption_vote" (
  "polloption" BIGINT NOT NULL,
  "vote" BIGINT NOT NULL,
  PRIMARY KEY ("polloption", "vote")
);

CREATE INDEX "idx_polloption_vote" ON "polloption_vote" ("vote");

ALTER TABLE "polloption_vote" ADD CONSTRAINT "fk_polloption_vote__polloption" FOREIGN KEY ("polloption") REFERENCES "polloption" ("id");

ALTER TABLE "polloption_vote" ADD CONSTRAINT "fk_polloption_vote__vote" FOREIGN KEY ("vote") REFERENCES "vote" ("id");



-- INSERT TEST DATA



INSERT INTO "poll" ("title", "description", "voices", "worst", "deadline") VALUES ('Favorite Color', 'What is your favorite color?', 1, false, '2023-06-30 23:59:59');
INSERT INTO "poll" ("title", "description", "voices", "worst", "deadline") VALUES ('Best Movie', 'What is the best movie you have ever seen?', 2, false, '2023-07-15 23:59:59');

INSERT INTO "polltoken" ("admin", "share", "poll") VALUES ('4f8401ef-2f2f-4a6d-8c7b-4b392ef0739f', '2a1e0fc0-4be0-480d-b0bc-170729625ca6', 1);
INSERT INTO "polltoken" ("admin", "share", "poll") VALUES ('a8ff771d-68fd-4f22-b70b-61c255430d79', 'bd0e06e4-9505-4175-b9ef-1939d285a84d', 2);

INSERT INTO "user" ("name") VALUES ('John');
INSERT INTO "user" ("name") VALUES ('Emily');
INSERT INTO "user" ("name") VALUES ('Yoda');
INSERT INTO "user" ("name") VALUES ('Karl');
INSERT INTO "user" ("name") VALUES ('Oliver');

INSERT INTO "poll_user" ("poll", "user") VALUES (1, 1);
INSERT INTO "poll_user" ("poll", "user") VALUES (1, 2);
INSERT INTO "poll_user" ("poll", "user") VALUES (1, 3);
INSERT INTO "poll_user" ("poll", "user") VALUES (2, 1);
INSERT INTO "poll_user" ("poll", "user") VALUES (2, 2);
INSERT INTO "poll_user" ("poll", "user") VALUES (2, 3);
INSERT INTO "poll_user" ("poll", "user") VALUES (2, 5);
INSERT INTO "poll_user" ("poll", "user") VALUES (2, 4);

INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('10:30:00', false, 1, 2);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('11:15:00', true, 2, 2);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('13:35:00', false, 3, 2);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('05:25:00', true, 4, 2);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('08:22:00', false, 5, 2);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('09:11:00', true, 1, 1);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('11:00:00', false, 2, 1);
INSERT INTO "vote" ("time", "worst", "owner", "poll") VALUES ('00:12:00', true, 3, 1);

INSERT INTO "edittoken" ("token", "vote") VALUES ('4b8401ef-2f2f-4a6d-8c7b-4b392ef0739f', 1);
INSERT INTO "edittoken" ("token", "vote") VALUES ('5c8401ef-2f2f-4a6d-8c7b-4b392ef0739f', 2);
INSERT INTO "edittoken" ("token", "vote") VALUES ('4e3d6d93-9ae6-4779-807c-faf915826f2e', 3);
INSERT INTO "edittoken" ("token", "vote") VALUES ('de6e3977-75f0-4cef-b0c0-94dac9bece42', 4);
INSERT INTO "edittoken" ("token", "vote") VALUES ('5fe40942-b8a7-4180-b24a-d14a0318867b', 5);
INSERT INTO "edittoken" ("token", "vote") VALUES ('9aa9df6c-446f-422e-b612-31f0dcbc80a2', 6);
INSERT INTO "edittoken" ("token", "vote") VALUES ('9902c8d6-6bc0-4138-bb00-6e6a12bbf174', 7);
INSERT INTO "edittoken" ("token", "vote") VALUES ('6f21ce76-9c96-4822-b76c-f0f5cc163862', 8);

INSERT INTO "polloption" ("text", "poll") VALUES ('Red', 1);
INSERT INTO "polloption" ("text", "poll") VALUES ('Blue', 1);
INSERT INTO "polloption" ("text", "poll") VALUES ('The Shawshank Redemption', 2);
INSERT INTO "polloption" ("text", "poll") VALUES ('The Godfather', 2);
INSERT INTO "polloption" ("text", "poll") VALUES ('Pulp Fiction', 2);
INSERT INTO "polloption" ("text", "poll") VALUES ('The Dark Knight', 2);
INSERT INTO "polloption" ("text", "poll") VALUES ('Forrest Gump', 2);
INSERT INTO "polloption" ("text", "poll") VALUES ('Inception', 2);

INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (1, 1);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (2, 2);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (3, 3);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (4, 4);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (5, 5);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (6, 6);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (7, 7);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (8, 8);
INSERT INTO "polloption_vote" ("polloption", "vote") VALUES (6, 8);




