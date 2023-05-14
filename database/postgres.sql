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




-- drop older versions of stuff
DROP INDEX IF EXISTS "idx_vote__option";
-- drop for re-creation
DROP INDEX IF EXISTS "idx_vote__option_poll_option_option";
DROP INDEX IF EXISTS "idx_vote__user";
DROP TABLE IF EXISTS "vote";
DROP INDEX IF EXISTS "idx_poll_user";
DROP TABLE IF EXISTS "poll_user";
DROP INDEX IF EXISTS "idx_option__poll";
DROP INDEX IF EXISTS "idx_option__fixed_in_poll";
DROP TABLE IF EXISTS "option";
DROP INDEX IF EXISTS "idx_poll__owner";
DROP TABLE IF EXISTS "poll";
DROP TABLE IF EXISTS "user";


-- https://editor.ponyorm.com/user/luckydonald/Pollock/snapshots/43
-- https://editor.ponyorm.com/user/luckydonald/Pollock/snapshots/43/postgres

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);

CREATE TABLE "poll" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "token" UUID UNIQUE,
  "owner" BIGINT,
  "description" TEXT,
  "voices" BIGINT,
  "worst" BOOLEAN,
  "deadline" TIMESTAMP,
  "visible_to_all" BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX "idx_poll__owner" ON "poll" ("owner");

ALTER TABLE "poll" ADD CONSTRAINT "fk_poll__owner" FOREIGN KEY ("owner") REFERENCES "user" ("id") ON DELETE SET NULL;

CREATE TABLE "option" (
  "poll" BIGINT NOT NULL,
  "option" BIGINT NOT NULL,
  "text" TEXT NOT NULL,
  "fixed_in_poll" BIGINT,
  PRIMARY KEY ("poll", "option")
);

CREATE INDEX "idx_option__fixed_in_poll" ON "option" ("fixed_in_poll");

ALTER TABLE "option" ADD CONSTRAINT "fk_option__fixed_in_poll" FOREIGN KEY ("fixed_in_poll") REFERENCES "poll" ("id") ON DELETE SET NULL;

ALTER TABLE "option" ADD CONSTRAINT "fk_option__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id") ON DELETE CASCADE;

CREATE TABLE "poll_user" (
  "poll" BIGINT NOT NULL,
  "user" BIGINT NOT NULL,
  PRIMARY KEY ("poll", "user")
);

CREATE INDEX "idx_poll_user" ON "poll_user" ("user");

ALTER TABLE "poll_user" ADD CONSTRAINT "fk_poll_user__poll" FOREIGN KEY ("poll") REFERENCES "poll" ("id");

ALTER TABLE "poll_user" ADD CONSTRAINT "fk_poll_user__user" FOREIGN KEY ("user") REFERENCES "user" ("id");

CREATE TABLE "vote" (
  "id" UUID PRIMARY KEY,
  "worst" BOOLEAN NOT NULL DEFAULT false,
  "option_poll" BIGINT NOT NULL,
  "option_option" BIGINT NOT NULL,
  "user" BIGINT NOT NULL
);

CREATE INDEX "idx_vote__option_poll_option_option" ON "vote" ("option_poll", "option_option");

CREATE INDEX "idx_vote__user" ON "vote" ("user");

ALTER TABLE "vote" ADD CONSTRAINT "fk_vote__option_poll__option_option" FOREIGN KEY ("option_poll", "option_option") REFERENCES "option" ("poll", "option") ON DELETE CASCADE;

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
  "id", "name"
) VALUES (
  (0, "system"),
  (1, "first!1")
) RETURNING "id";
