DROP DATABASE IF EXISTS pollshed;
DROP USER  IF EXISTS pollshed;

CREATE USER pollshed WITH CREATEDB ENCRYPTED PASSWORD 'Stay Out Of My Shed';
CREATE DATABASE pollshed WITH OWNER = pollshed;
GRANT ALL PRIVILEGES ON DATABASE pollshed TO pollshed;
-- GRANT ALL PRIVILEGES ON TABLE "poll_user" TO pollshed;
-- GRANT ALL PRIVILEGES ON TABLE "option" TO pollshed;
-- GRANT ALL PRIVILEGES ON TABLE "poll" TO pollshed;
-- GRANT ALL PRIVILEGES ON TABLE "user" TO pollshed;

\connect pollshed;






DROP INDEX IF EXISTS "idx_poll_user";
DROP TABLE IF EXISTS "poll_user";
DROP INDEX IF EXISTS "idx_option__poll";
DROP INDEX IF EXISTS "idx_option__fixed_in_poll";
DROP TABLE IF EXISTS "option";
DROP INDEX IF EXISTS "idx_poll__owner";
DROP TABLE IF EXISTS "poll";
DROP TABLE IF EXISTS "user";


-- https://editor.ponyorm.com/user/luckydonald/Pollock/snapshots/31
-- https://editor.ponyorm.com/user/luckydonald/Pollock/snapshots/31/postgres

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "poll" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "token" UUID UNIQUE,
  "owner" INTEGER,
  "description" TEXT,
  "voices" BIGINT,
  "worst" BOOLEAN,
  "deadline" TIMESTAMP,
  "visible_to_all" BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX "idx_poll__owner" ON "poll" ("owner");

ALTER TABLE "poll" ADD CONSTRAINT "fk_poll__owner" FOREIGN KEY ("owner") REFERENCES "user" ("id") ON DELETE SET NULL;

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

ALTER TABLE "poll_user" ADD CONSTRAINT "fk_poll_user__user" FOREIGN KEY ("user") REFERENCES "user" ("id");

CREATE TABLE "vote" (
  "id" SERIAL PRIMARY KEY,
  "option" INTEGER NOT NULL,
  "user" INTEGER NOT NULL
);

CREATE INDEX "idx_vote__option" ON "vote" ("option");

CREATE INDEX "idx_vote__user" ON "vote" ("user");

ALTER TABLE "vote" ADD CONSTRAINT "fk_vote__option" FOREIGN KEY ("option") REFERENCES "option" ("id") ON DELETE CASCADE;

ALTER TABLE "vote" ADD CONSTRAINT "fk_vote__user" FOREIGN KEY ("user") REFERENCES "user" ("id") ON DELETE CASCADE

;-- Now our own data







GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "public" TO pollshed;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA "public" TO pollshed;


INSERT INTO "poll" (
  "id", "token", "owner", "title", "description", "voices", "worst", "visible_to_all"
) VALUES (
  1, 'e6f79f06-f280-11ed-b574-325096b39f47', NULL, 'Test Poll', 'A poll to test stuff', 1, TRUE, TRUE
) RETURNING "id", "token", "owner", "title", "description", "voices", "worst", "deadline", "visible_to_all";

INSERT INTO "option" (
  "id", "text", "poll"
) VALUES (
  (1, 'Example A', 0), (2, 'Example B', 0), (3, 'Example C', 0)
) RETURNING "id", "text", "poll", "fixed_in_poll";

INSERT INTO "user" (
  "id"
) VALUES (
  (1)
) RETURNING "id";
