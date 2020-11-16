// MOVED ALL THIS TO Loaders/mongoose.js








// // usually  combines all models and exports all them 
// // as database interface,  to the Express application
// // for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial



// // import Message from './message';   // example code
// // import mongoose from 'mongoose';
// // import Project from './project';
// const mongoose = require('mongoose');
// mongoose.set('debug', true);
// const Project = require('./project'); 


// // const URL_MONGODB = "mongodb://localhost:27017/data/db"; NOPE
// const URL_MONGODB = "mongodb://localhost:27017/portfoliodb"; 

// // eg. the environment var in an .env file could look like this:
// // DATABASE_URL=mongodb://localhost:27017/node-express-mongodb-server

// // The database URL can seen when you start up 
// // MongoDB on the command line. You only need 
// // to define a subpath for the URL 
// // to define a specific database. 
// // If the database doesn't exist yet, 
// // MongoDB will create one for you.

// //  ******** Should I move the initial DB connection to loaders or something??  
// const connectDb = () => {    // Does it still work if I disconnect this? NO - bc use this in main index!!! 
//     // add error logging! 
//     // When createProjectSeedData() was never reached, this was never being invoked.....
//     console.log("!!!!!!!!!!!!!************ connectDb from Models was called!!!!!!!!!!!!!!!!!!!!")
//     console.log("!!!!!!!!!!!!!************ connectDb from Models was called!!!!!!!!!!!!!!!!!!!!")
//     console.log("!!!!!!!!!!!!!************ connectDb from Models was called!!!!!!!!!!!!!!!!!!!!")
//     return mongoose.connect(URL_MONGODB);
//     // return mongoose.connect(process.env.DATABASE_URL);
// };

// // connectDb.on('error', (error) => console.error(error))    // connectDb.on is not a function  :( 
// // db.once('open', () => console.log('connected to database'))



// // const models = { User, Message };  // export as list, doesn't like
// // const models = { Project };   as list.  commented out to resolve error  TypeError: models.models.Project is not a constructor main index.js ln161
// const models = Project;  // YUP! This fixed it 


// // export { connectDb }; // export list. 
// // export default models;
// exports.connectDb = connectDb;  // the MongoDB DataBase  **Connection** itself,  there is a Connection object.. 
// exports.models = models;




// // SetUp per :   https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// // //Import the mongoose module
// // var mongoose = require('mongoose');

// // //Set up default mongoose connection
// // var mongoDB = 'mongodb://127.0.0.1/my_database';
// // mongoose.connect(mongoDB, { useNewUrlParser: true });

// // // get the default Connection object with mongoose.connection.
// // var db = mongoose.connection;

// // //Bind connection to error event (to get notification of connection errors)
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));


