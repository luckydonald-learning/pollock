import pool from '../../../../database/db.js'; // Anbindung der Datenbank 
import ServerError from '../../lib/error.js';

/**
 * Add a new poll.
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const addPollack = async (options) => {
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

export const findPollack = async (options) => {

  try {
    const pollack = await pool.query(`SELECT p.*
    FROM poll AS p
    JOIN polltoken AS pt ON p.id = pt.poll
    WHERE pt.share = $1;
    `, [options.token]);

    if (!pollack) {
      throw new Error('Pollack not found');
    }

    const pollRow = pollack.rows[0];

    const allOptions = await pool.query(`SELECT po.id, po.text, po.fixed
    FROM polltoken AS pt
    JOIN poll AS p ON pt.poll = p.id
    JOIN polloption AS po ON p.id = po.poll
    WHERE pt.share = $1;`, [options.token]);

    // Fasse alle Optionen zu einem Array wie im Response gefordert zusammen
    const optionsArray = allOptions.rows.map(row => ({
      id: row.id,
      text: row.text
    }));

    const participants = await pool.query(`SELECT u.*
    FROM "user" AS u
    JOIN poll_user AS pu ON u.id = pu.user
    WHERE pu.poll = $1;`, [pollRow.id]);

    // Fasse alle Optionen zu einem Array wie im Response gefordert zusammen
    const participantsArray = participants.rows.map(row => ({
      name: row.name,
    }));

    const voicesOfPoll = await pool.query(`SELECT pv.polloption, ARRAY_AGG(v.owner) AS user_ids
    FROM polloption_vote AS pv
    JOIN vote AS v ON pv.vote = v.id
    WHERE v.poll = $1
    GROUP BY pv.polloption;`, [pollRow.id]);
  
    const voicesOfPollArray = voicesOfPoll.rows.map(row => ({
      polloption: row.polloption,
      user_ids: row.user_ids,
    }));

    // Array mit den IDs der PollOptions, bei denen fixed=true ist
    const fixedOptions = allOptions.rows
      .filter(option => option.fixed === true)
      .map(option => option.id);


    const optionsWrapper = { options: [] };
    
    for (const option of optionsArray) {
      const optionId = option.id;
      const optionText = option.text;
      const userIds = [];

      // Überprüfen, ob die Option im Ergebnis der SELECT-Anweisung enthalten ist
      for (const row of voicesOfPollArray) {
        if (row.polloption === String(optionId)) {
          userIds.push(...row.user_ids);
          break;
        }
      }
      const optionData = {
        voted: userIds,
        worst: [] 
      };
      optionsWrapper.options.push(optionData);
    }

    const response = {
      "poll": {
        "body": {
          "title": pollRow.title,
          "description": pollRow.description,
          "options": optionsArray,
          "setting": {
            "voices": pollRow.voices,
            "worst": pollRow.worst,
            "deadline": pollRow.deadline,
          },
          "fixed": fixedOptions,
        },
        "share": {
          "link": "string",
          "value": options.token,
        }
      },
      "participants": participantsArray,
      "options": optionsWrapper.options,
    }
   
    return {
      status: 200,
      data: response,
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
export const updatePollack = async (options) => {
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
export const deletePollack = async (options) => {
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

export default { addPollack, findPollack, updatePollack, deletePollack }

