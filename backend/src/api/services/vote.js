import ServerError from "../../lib/error.js";
import getDatabase from "../../lib/database.js";
import { uuidv7 } from "uuidv7";

/**
 * Add a new vote to the poll
 *
 * @param {Object} options
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

  const json = {"owner": {"name": "first!1", "lock": false}, "choice": [{"id": 1, "worst": false}]}
  try {
    const db = await getDatabase();
    // const res = await db.query('SELECT $1::text as message', ['Hello world!'])
    for (const choice of json.choice) {
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
          json.owner.name,
        ]
      ]
      console.log(choice, ...query)
      const res = await db.query(...query);
      console.log(res.rows[0]) // Hello world!
    }

    await db.end()
  } catch (e) {
    // TODO: catch `duplicate key value violates unique constraint "idx_vote_uniqueness"`.
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
export async function findVotePollack(options) {
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
    data: 'findVotePollack ok!'
  };
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

