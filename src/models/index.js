// usually  combines all models and exports all them 
// as database interface,  to the Express application
// for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial

import mongoose from 'mongoose';
import Project from './project';
// import Message from './message';
const URL_MONGODB = "http://localhost:27017"; 
// eg. the environment var in an .env file could look like this:
// DATABASE_URL=mongodb://localhost:27017/node-express-mongodb-server

// The database URL can seen when you start up 
// MongoDB on the command line. You only need 
// to define a subpath for the URL 
// to define a specific database. 
// If the database doesn't exist yet, 
// MongoDB will create one for you.


const connectDb = () => {
    return mongoose.connect(URL_MONGODB);
    // return mongoose.connect(process.env.DATABASE_URL);
};


// const models = { User, Message };
const models = { Project };

export { connectDb };
export default models;