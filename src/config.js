const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || '872ff00f-76a9-4257-8bc4-5b692c5bfa4b',
    API_BASE_URL: process.env.API_BASE_URL || 'https://the-console.herokuapp.com/api',
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'theConsole',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '2h',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://theconsole-thankful-cassowary.now.sh/',
  }