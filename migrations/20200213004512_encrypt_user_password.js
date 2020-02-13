
const { saltHashPassword } = require('../store')

// Await - support started w Node 7
exports.up = async function up (knex) {
    await knex.schema.table('user', t => {
      t.string('salt').notNullable()
      t.string('encrypted_password').notNullable()
    })
    const users = await knex('user')
    await Promise.all(users.map(convertPassword))
    await knex.schema.table('user', t => {
      t.dropColumn('password')
    })  
    
    function convertPassword (user) {
      const { salt, hash } = saltHashPassword(user.password)
      return knex('user')
        .where({ id: user.id })
        .update({
          salt,
          encrypted_password: hash
        })
    }
}



//  Without Using async/await - complex version: 
// exports.up = function up (knex) {
//         return knex.schema
//             .table('user', t => {
//                 t.string('salt').notNullable()
//                 t.string('encrypted_password').notNullable()
//             })
//             .then(() => knex('user'))
//             .then(users => Promise.all(users.map(convertPassword)))
//             .then(() => {
//                 return knex.schema.table('user', t => {
//                 t.dropColumn('password')
//                 })
//         })  

//         function convertPassword (user) {  // SAME AS ABOVE
//             const { salt, hash } = saltHashPassword(user.password)
//             return knex('user')
//                 .where({ id: user.id })
//                 .update({
//                 salt,
//                 encrypted_password: hash
//         })
// }
  


//   We can’t get the original password back in the down function because 
//   it is encrypted, hence we just try our best by putting the schema 
//   back as it was.

//   There is a tonne of promises being used here which is common when 
//   writing migrations. 


  exports.down = function down (knex) {
    return knex.schema.table('user', t => {
      t.dropColumn('salt')
      t.dropColumn('encrypted_password')
      t.string('password').notNullable()
    })
  }