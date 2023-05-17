
const pool = require('../../../../database/db'); // Anbindung der Datenbank
import ServerError from "../../lib/error.js";
import { getDatabase, DatabaseError } from "../../lib/database.js";
import { uuidv7 } from "uuidv7";

/**
 * Add a new vote to the poll
 *
 * @param {Object} options
 * @param {Object} options.body The body of the request
 * @param {String} options.token Share token to vote in the poll.
 * @throws {Error}
 * @return {Promise}
 */
export async function addVotePollack(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });


  // TODO: implement `owner.lock` - bool - The user is a Pollock user.

  try {
    const db = await getDatabase();
    // const res = await db.query('SELECT $1::text as message', ['Hello world!'])
    for (const choice of options.body.choice) {
      // INSERT INTO "public"."vote"("worst", "option_poll", "option_option", "user") VALUES(FALSE, 1, 1, 2) RETURNING "id", "worst", "option_poll", "option_option", "user";
      // 'INSERT INTO "vote" ("option_poll", "option_option", "user") VALUES((SELECT "id" FROM "poll" WHERE "token" = $1), (SELECT "id" FROM "user" WHERE "name" = $2) RETURNING "id";
      const query = [`
        INSERT INTO "vote" (
          "id", "option_poll", "option_option", "user"
        ) VALUES (
          -- "id":
          $1,
          -- "option_poll":
          (SELECT "id" FROM "poll" WHERE "token" = $2::UUID),
          -- "option_option":
          $3,
          -- "user":
          (SELECT "id" FROM "user" WHERE "name" = $4)
        )`,
        [
          // "id"
          uuidv7(),
          // "option_poll"
          options.token,
          // "option_option"
          choice.id,
          // "user"
          options.body.owner.name,
        ]
      ]
      console.log(choice, ...query)
      const res = await db.query(...query);
      console.log(res.rows[0]) // Hello world!
    }

    await db.end()
  } catch (e) {
    if (e instanceof DatabaseError && e.message === 'insert or update on table "vote" violates foreign key constraint "fk_vote__option_poll__option_option"') {
      throw new ServerError({
        status: 404, // Or another error code.
        error: 'Not found: Vote option not found.' // Or another error message.
      });
    }
    if (e instanceof DatabaseError && e.message === 'null value in column "user" of relation "vote" violates not-null constraint') {
      throw new ServerError({
        status: 404, // Or another error code.
        error: 'Not found: User not found.' // Or another error message.
      });
    }
    if (e instanceof DatabaseError && e.where === 'unnamed portal parameter $2 = \'...\'' && e.message.startsWith('invalid input syntax for type uuid: "')) {
      throw new ServerError({
        status: 404, // Or another error code.
        error: 'Not found: Poll invalid.' // Or another error message.
      });
    }
    if (e instanceof DatabaseError && e.message === 'null value in column "option_poll" of relation "vote" violates not-null constraint') {
      throw new ServerError({
        status: 404, // Or another error code.
        error: 'Not found: Poll not found.' // Or another error message.
      });
    }
    if (e instanceof DatabaseError && e.message === 'duplicate key value violates unique constraint "idx_vote_uniqueness"') {
      throw new ServerError({
        status: 409, // Or another error code.
        error: 'Conflict: Vote already exists.' // Or another error message.
      });
    }
    console.error(e);  // TODO: better error handling, yo.
  }

  return {
    status: 200,
    data: 'addVotePollack ok!'
  };
}

/**
 * @param {Object} options
 * @param {String} options.token The edit token of poll
 * @throws {Error}
 * @return {Promise}
 */

module.exports.findVotePollack = async (options) => {
  try {
    const pollack = await pool.query(`SELECT u.*, p.*, pt.share AS shared_token
    FROM "user" AS u
    JOIN "vote" AS v ON u.id = v.owner
    JOIN "poll" AS p ON v.poll = p.id
    JOIN "polltoken" AS pt ON p.id = pt.poll
    JOIN "edittoken" AS et ON v.id = et.vote
    WHERE et.token = $1`, [options.token]);
    if (!pollack) {
      throw new Error('Vote not found');
    }
    return {
      status: 200,
      data: pollack
    };
  } catch (error) {
    throw new ServerError({
      status: 500,
      error: error.message
    });
  }


/**
 * @param {Object} options
 * @param {String} options.token Edit token to perform the update with
 * @throws {Error}
 * @return {Promise}
 */
export async function updateVotePollack(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'updateVotePollack ok!'
  };
}

/**
 * @param {Object} options
 * @param {String} options.token Edit token to delete the poll
 * @throws {Error}
 * @return {Promise}
 */
export async function deleteVotePollack(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'deleteVotePollack ok!'
  };
}

export default {addVotePollack, findVotePollack, updateVotePollack, deleteVotePollack}

