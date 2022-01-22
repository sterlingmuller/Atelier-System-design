const { Client, Pool } = require('pg');
//connection pool?
const connection = new Pool ({
  user: process.env.dbuser || 'postgres',
  host: process.env.host || 'localhost',
  database: 'ratingsandreviewdb',
  password: process.env.password || ''
})

connection.connect();

module.exports = connection;