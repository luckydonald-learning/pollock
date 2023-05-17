const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Get Out Of My Shed',
  host: 'localhost',
  port: 5432,
  database: 'pollshed'
});

module.exports = pool;