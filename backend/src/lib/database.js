"use strict";
import pkg from 'pg';
const { Client } = pkg;


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

export default getDatabase;  // same as `export default getDatabase`.
