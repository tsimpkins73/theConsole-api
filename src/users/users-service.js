const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  getAllUsers(db) {
    return db('users').select('id', 'username', 'name')
},

getUserWithUserId(db, userId) {
  return db('users').select('id', 'username', 'name')
    .where('id', { userId })
    .first()
},

getUserWithUsername(db, username) {
  return db('users')
    .where('username', username).select('id', 'username', 'name')
    .first()
},
  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user)
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },

  deleteUser(knex, username) {
    return knex.from('users')
    .select('*')
        .where('username', username )
        .delete()
},

  serializeUser(user) {
    return {
      id: user.id,
      name: xss(user.full_name),
      username: xss(user.username),
      email: xss(user.nick_name),
    }
  },
}

module.exports = UsersService
