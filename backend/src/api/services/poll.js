import pool from '../../../../database/db.js'; // Anbindung der Datenbank 
import ServerError from '../../lib/error.js';
import { uuidv7 } from 'uuidv7';


// Generiere eine UUID7
const generateUUID7 = () => {
  const uuid = uuidv7();
  return uuid;
};

/**
 * Add a new poll.
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const addPollack = async (options) => {
  const title = options.body.title;
  const description = options.body.description;
  const voices = options.body.setting.voices;
  const worst = options.body.setting.worst;
  const deadline = (options.body.setting.deadline) === '' ? undefined : (options.body.setting.deadline);
  const polloptions = options.body.options;

  const insertPoll = await pool.query(
    `INSERT INTO "poll" ("title", "description", "voices", "worst", "deadline")
    VALUES ($1, $2, $3, $4, $5);`,
    [title, description, voices, worst, deadline]
  );

  const latestPollIDQuery = await pool.query(`SELECT COUNT(*) AS row_count FROM "poll";`);
  const latestPollIDNum = parseInt(latestPollIDQuery.rows[0].row_count);

  // Generiere share- und admin-token
  const uuid7_share = generateUUID7();
  const uuid7_admin = generateUUID7();

  const insertPollToken = await pool.query(
    `INSERT INTO "polltoken" ("admin", "share", "poll") VALUES ($1, $2, $3);`,
    [uuid7_admin, uuid7_share, latestPollIDNum]
  );

  // Füge alle Optionen hinzu
  for (const option of polloptions) {
    const optionText = option.text;
    const insertPollOption = await pool.query(`INSERT INTO "polloption" ("text", "poll") VALUES ($1, $2);`, [
      optionText,
      latestPollIDNum
    ]);
  }

  return {
    status: 200,
    data: {
      admin: {
        link: "",
        value: uuid7_admin
      },
      share: {
        link: "",
        value: uuid7_share
      }
    }
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
  const tokensFound = await pool.query(`SELECT COUNT(*) AS token_count
    FROM polltoken
    WHERE admin = $1;
    `, [options.token]);

  console.log("FOUND:" + JSON.stringify(tokensFound));
  if (!tokensFound) {
    throw new Error('Pollack not found');
  }

  return {
    status: 200,
    data: 'updatePollack ok!'
  };
}


const countAdminTokens = async (adminToken) => {
  const tokensFound = await pool.query(`SELECT COUNT(*) AS token_count
    FROM polltoken
    WHERE admin = $1;
    `, [adminToken]);

  console.log("FOUND:" + JSON.stringify(tokensFound));
  return tokensFound;
}

/**
 * @param {Object} options
 * @param {String} options.token Admin token to delete the poll
 * @throws {Error}
 * @return {Promise}
 */
export const deletePollack = async (options) => {
  const tokensFound = countAdminTokens(options.token) > 0;
  if (!tokensFound) {
    throw new Error('Pollack not found');
  }

  return {
    status: 200,
    data: 'deletePollack ok!'
  };
}

export default { addPollack, findPollack, updatePollack, deletePollack }

