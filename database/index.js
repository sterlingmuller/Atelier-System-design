const { Client, Pool } = require('pg');
const dotenv = require ('dotenv');
dotenv.config();

const connection = new Pool ({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'ratingsandreviewdb',
  password: process.env.PASSWORD
})

connection.connect();

module.exports = connection;