const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || '872ff00f-76a9-4257-8bc4-5b692c5bfa4b',
    API_BASE_URL: process.env.API_BASE_URL || 'https://the-console.herokuapp.com//api',
    DB_URL: process.env.DB_URL || 'postgres://fyxberjbsmgram:3b5dd74bbacb752ce6970bdcc42b81e4e0594683dcdc4d8e22731a9a8e1760e4@ec2-174-129-254-217.compute-1.amazonaws.com:5432/de7a6qnferjba2',
    JWT_SECRET: process.env.JWT_SECRET || 'theConsole',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '2h',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://theconsole-thankful-cassowary.now.sh/',
  }
