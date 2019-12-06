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
    API_BASE_URL: 'the-console.herokuapp.com',
    DB_URL: process.env.DB_URL || "postgres://fyxberjbsmgram:3b5dd74bbacb752ce6970bdcc42b81e4e0594683dcdc4d8e22731a9a8e1760e4@ec2-174-129-254-217.compute-1.amazonaws.com:5432/de7a6qnferjba2",
    config,
    JWT_SECRET: process.env.JWT_SECRET || 'theConsole',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '2h',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://theconsole-thankful-cassowary.now.sh/',
  }
