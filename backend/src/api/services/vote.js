import ServerError from "../../lib/error.js";

/**
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

