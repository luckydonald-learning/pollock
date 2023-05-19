"use strict";
import pkg from 'pg';
const { Client, DatabaseError } = pkg;


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

console.log('DatabaseError', DatabaseError)

export { DatabaseError, getDatabase, getDatabase as default };
