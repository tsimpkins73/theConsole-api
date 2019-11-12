const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'consoleAdmin',
  password: '73rdtitan',
  database: 'theConsoleDB',
};

const pool = mysql.createPool(config);

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'token',
    pool,
    API_BASE_URL: 'the-console.herokuapp.com/',
  }
