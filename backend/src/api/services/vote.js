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
    // Holt mit dem Edit-Token grundlegende Body Daten des zugehörigen Polls
    // {"id", "name", "title", "description", "voices", "worst", "deadline","shared_token"}
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

    const pollackRow = pollack.rows[0];
    // Holt alle innerhalb eines Votes gewählte Optionen anhand des Edit-Tokens
    // {"polloption","vote"}
    const choice = await pool.query(`SELECT pv.*
    FROM edittoken AS et
    JOIN vote AS v ON et.vote = v.id
    JOIN polloption_vote AS pv ON v.id = pv.vote
    WHERE et.token = $1`, [options.token]);

    const choiceArray = choice.rows.map(row => {
      return {
        id: parseInt(row.polloption),
        vote: row.vote,
      };
    });
    console.log("FELIX TESTET: " + JSON.stringify(choiceArray));
    // Holt alle Optionen des Polls anhand des Edit-Tokens
    /* [
        {"id","text","fixed"},
        {"id","text","fixed"},
        ...
       ]
    */
    const allOptions = await pool.query(`SELECT po.id, po.text, po.fixed
    FROM edittoken AS et
    JOIN vote AS v ON et.vote = v.id
    JOIN poll AS p ON v.poll = p.id
    JOIN polloption AS po ON p.id = po.poll
    WHERE et.token = $1;`, [options.token]);

    // Fasse alle Optionen zu einem Array wie im Response gefordert zusammen
    const optionsArray = allOptions.rows.map(row => ({
      id: row.id,
      text: row.text
    }));

    const voteTime = await pool.query(`SELECT v.time
  FROM edittoken AS et
  JOIN vote AS v ON et.vote = v.id
  WHERE et.token = $1`, [options.token]);

    // Array mit den IDs der PollOptions, bei denen fixed=true ist
    const fixedOptions = allOptions.rows
      .filter(option => option.fixed === true)
      .map(option => option.id);


    const response = {
      "poll": {
        "body": {
          "title": pollackRow.title,
          "description": pollackRow.description,
          "options": optionsArray,
          "setting": {
            "voices": pollackRow.voices,
            "worst": pollackRow.worst,
            "deadline": pollackRow.deadline
          },
          "fixed": fixedOptions
        },
        "share": {
          "link": "",
          "value": pollack.rows[0].shared_token,
        }
      },
      "vote": {
        "owner": {
          "name": pollack.rows[0].name
        },
        "choice": choiceArray,
      },
      "time": voteTime.rows[0].time
    };

    return {
      status: 200,
      data: response
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

