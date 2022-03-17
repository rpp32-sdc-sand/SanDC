const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubuntu',
  password: '',
  database: 'sdc',
  // host: '52.91.62.180',
  host: '172.31.93.92',
  port: '5432'
});

module.exports = { pool };