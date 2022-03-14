const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '',
  database: 'sdc',
  // host: '52.91.62.180',
  host: localhost,
  port: '5432'
});

module.exports = { pool };