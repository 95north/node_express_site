
// index.js : When we run this file, the server will listen on 
// http://localhost:7555 for POST requests to /createUser 
// and pass those requests to the store file. 
// The server will then respond with a 200 status code 
// (200 is the code that every HTTP server uses to say the request was successful).

// For the time being, we will mock the store in order to check that our API works.


module.exports = {
    createUser ({ username, password }) {
      console.log(`Add user ${username} with password ${password}`)
      return Promise.resolve()
    }
  }