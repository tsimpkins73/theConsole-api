const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'token',
    API_BASE_URL: 'the-console.herokuapp.com/api',
    DB_URL: process.env.DB_URL ,
    JWT_SECRET: process.env.JWT_SECRET || 'theConsole',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '2h',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://theconsole-thankful-cassowary.now.sh/',
  }
