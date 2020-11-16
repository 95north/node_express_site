
const store = require('../services/store');  //****** KNEX TO CONNECT TO MySQL DATABASE !!!!  */
const connectDb = require('../models');    // the MongoDB database Connection itself 



// // PORT for MySQL + KNEX .   Looks like it works running 2 ports for 2 DBs! 
// app.listen(7555, () => {
//   console.log('Server running on http://localhost:7555')
// })






module.exports = require('knex')({
    client: 'mysql',
    connection: {
      user: 'root',
      password: 'tori',
      database: 'node_site_db'
    }// ,
    // migrations: {
    //   tableName: migrationTable
    // }
  })