const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))

module.exports = {
  saltHashPassword,
  createUser ({ username, password }) {
    console.log(`Add user ${username}`)
    const { salt, hash } = saltHashPassword(password)
    return knex('user').insert({
      salt,
      encrypted_password: hash,
      username
    })
  }
}

function saltHashPassword (password) {
  const salt = randomString()
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}

// crypto is a native node module and need not be installed using npm.







// All we need our store to do is load in knex using the 
// knexfile.js config and then write data to the user table 
// whenever a createUser request is made.

// const knex = require('knex')(require('./knexfile'))

// module.exports = {
//   createUser ({ username, password }) {
//     console.log(`Add user ${username} with password ${password}`)
//     return knex('user').insert({
//       username,
//       password
//     })
//   }
// }





// Initial store.js : 
// index.js : When we run this file, the server will listen on 
// http://localhost:7555 for POST requests to /createUser 
// and pass those requests to the store file. 
// The server will then respond with a 200 status code 
// (200 is the code that every HTTP server uses to say the request was successful).

// For the time being, we will mock the store in order to check that our API works.
// Below: did NOT persist created user to mysql

// module.exports = {
//     createUser ({ username, password }) {
//       console.log(`Add user ${username} with password ${password}`)
//       return Promise.resolve()
//     }
//   }