const mysql = require('mysql');
/* const dotenv = require('dotenv')
dotenv.config() */

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    API_TOKEN: process.env.API_TOKEN,
    API_BASE_URL: process.env.API_BASE_URL,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  }
