const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.APP_DB_USER,
    host: process.env.APP_DB_HOST,
    database: process.env.APP_DB_NAME,
    password: process.env.APP_DB_PASSWORD,
    port: process.env.APP_DB_PORT,
});

module.exports = pool;