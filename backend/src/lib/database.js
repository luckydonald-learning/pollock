"use strict";
const { Client } = require('pg')

async function getDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'pollshed',
    user: 'pollshed',
    password: 'Stay Out Of My Shed',
  })  // see https://node-postgres.com/apis/client
  await client.connect();
  return client;
}

module.exports = getDatabase;  // same as `export default getDatabase`.
