const { Pool } = require('pg');
const dotenv = require ('dotenv');
dotenv.config();

const connection = new Pool ({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'ratingsandreview_remote',
  password: process.env.PASSWORD,
  port: 5432
})

connection.connect();

module.exports = connection;