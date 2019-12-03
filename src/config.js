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
    API_BASE_URL: 'the-console.herokuapp.com/',
    DB_URL: process.env.DB_URL || "postgresql://consoleAdmin:73rdtitan@localhost/theConsoleDB",
    config,
    JWT_SECRET: process.env.JWT_SECRET || 'theConsole',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '2h',
  }
