const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const jsonParser = express.json();
const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
.get('/api/users', (req, res, next) => {
  UsersService.getAllUsers(req.app.get('db'))
  .catch(next)
  .then(results => {
    res.send(results);
  });
})

.get('/api/users/:username', (req, res, next) => {
  const { username } = req.params
  UsersService.getUserWithUsername(req.app.get('db'), username)
  .catch(next)
  .then(results => {
    res.send(results);
  });
})

.delete('/api/users/:username', jsonParser, (req, res) => {
  const {
    username
  } = req.params;
  const knexInstance = req.app.get('db')
 
  UsersService.deleteUser(knexInstance, username)
    .then(results => {
      res.sendStatus(204);
    });
    
})

.post('/api/users', jsonBodyParser, (req, res, next) => {
    const { password, username, name, } = req.body

    for (const field of ['name', 'username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              password: hashedPassword,
              name,
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
  })

module.exports = usersRouter
