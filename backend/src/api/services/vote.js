const pool = require('../../../../database/db'); // Anbindung der Datenbank
const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.token Share token to vote in the poll.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addVotePollack = async (options) => {
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
    data: 'addVotePollack ok!'
  };
};

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

  return {
    status: 200,
    data: 'findVotePollack ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.token Edit token to perform the update with
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateVotePollack = async (options) => {
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
};

/**
 * @param {Object} options
 * @param {String} options.token Edit token to delete the poll
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteVotePollack = async (options) => {
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
};

