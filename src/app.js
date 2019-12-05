require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config.js')
const app = express()
const article_router = require('./articles/article-router.js')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const morganOption = (NODE_ENV === 'production')
'tiny' ;
'common';

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(helmet())
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/* app.use(validator)
app.use(errorHandler)
 */

 app.use(article_router)
 app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})
app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = {
      error: {
        message: 'server error'
      }
    }
  } else {
    console.error(error)
    response = {
      message: error.message,
      error
    }
  }
  res.status(500).json(response)
})
module.exports = app