const ServerError = require('../../lib/error');
const getDatabase = require('../../lib/database');

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addPollack = async (options) => {
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
};

/**
 * Return the statistics of the poll by share token.
 *
 * @param {Object} options
 * @param {String} options.token The share token of poll
 * @throws {Error}
 * @return {Promise}
 */
module.exports.findPollack = async (options) => {
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
  const { token } = options;

  try {
    const db = await getDatabase();
    // const res = await db.query('SELECT $1::text as message', ['Hello world!'])
    const res = await db.query('SELECT * FROM "poll" WHERE token = $1::UUID', [token])
    console.log(res.rows[0]) // Hello world!
    await db.end()
  } catch (e) {
    console.error(e);  // TODO: better error handling, yo.
  }

  return {
    status: 200,
    data: 'findPollack ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.token Admin token to perform the update with
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updatePollack = async (options) => {
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
};

/**
 * @param {Object} options
 * @param {String} options.token Admin token to delete the poll
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deletePollack = async (options) => {
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
};

