// usually  combines all models and exports all them 
// as database interface,  to the Express application
// for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial



// import Message from './message';   // example code
// import mongoose from 'mongoose';
// import Project from './project';
const mongoose = require('mongoose');
mongoose.set('debug', true);
const Project = require('./project'); 


// const URL_MONGODB = "mongodb://localhost:27017/data/db"; NOPE
const URL_MONGODB = "mongodb://localhost:27017/portfoliodb"; 

// eg. the environment var in an .env file could look like this:
// DATABASE_URL=mongodb://localhost:27017/node-express-mongodb-server

// The database URL can seen when you start up 
// MongoDB on the command line. You only need 
// to define a subpath for the URL 
// to define a specific database. 
// If the database doesn't exist yet, 
// MongoDB will create one for you.


const connectDb = () => {    // Does it still work if I disconnect this? 
    // When createProjectSeedData() was never reached, this was never being invoked.....
    console.log("!!!!!!!!!!!!!************ connectDb from Models was called!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!************ connectDb from Models was called!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!************ connectDb from Models was called!!!!!!!!!!!!!!!!!!!!")
    return mongoose.connect(URL_MONGODB);
    // return mongoose.connect(process.env.DATABASE_URL);
};


// const models = { User, Message };
// const models = { Project };   as list.  commented out to resolve error  TypeError: models.models.Project is not a constructor main index.js ln161
const models = Project;  // YUP! This fixed it 

// export { connectDb }; // export list. 
// export default models;
exports.connectDb = connectDb;
exports.models = models;