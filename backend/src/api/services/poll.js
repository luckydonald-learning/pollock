const pool = require('../../../../database/db'); // Anbindung der Datenbank
const ServerError = require('../../lib/error');

/**
 * Add a new poll.
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export async function addPollack(options) {
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
    data: 'addPollack ok!'
  };
}

/**
 * Return the statistics of the poll by share token.
 *
 * @param {Object} options
 * @param {String} options.token The share token of poll
 * @throws {Error}
 * @return {Promise}
 */

module.exports.findPollack = async (options) => {

  try {
    const pollack = await pool.query(`SELECT p.*, po.*, pt.share AS shared_token
    FROM poll AS p
    JOIN polltoken AS pt ON p.id = pt.poll
    LEFT JOIN vote AS v ON v.poll = p.id
    LEFT JOIN polloption AS po ON po.poll = p.id
    WHERE pt.admin = $1 OR pt.share = $1
    GROUP BY p.id, pt.share, po.id;`, [options.token]);
    if (!pollack) {
      throw new Error('Pollack not found');
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
};


/**
 * @param {Object} options
 * @param {String} options.token Admin token to perform the update with
 * @throws {Error}
 * @return {Promise}
 */
export async function updatePollack(options) {
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
    data: 'updatePollack ok!'
  };
}

/**
 * @param {Object} options
 * @param {String} options.token Admin token to delete the poll
 * @throws {Error}
 * @return {Promise}
 */
export async function deletePollack(options) {
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
    data: 'deletePollack ok!'
  };
}

export default {addPollack, findPollack, updatePollack, deletePollack}

