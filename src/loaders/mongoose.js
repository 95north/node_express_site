// Add MongoDB connection here
console.log("Hello from Mongoose Loader")


const URL_MONGODB = "mongodb://localhost:27017/portfoliodb";  // "mongodb://localhost:27017/data/db";  //"mongodb://localhost:27017";           // *** Location of db??!
const PORT_MONGODB = "27017";  // Redundant??
// mongodb://<HOSTNAME>:<PORT>/<DBNAME>
// for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial



// usually  combines all models and exports all them 
// as database interface,  to the Express application
// for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial



// import Message from './message';   // example code
// import mongoose from 'mongoose';
// import Project from './project';
const mongoose = require('mongoose');
mongoose.set('debug', true);
const models = require('../models');  
const Project = require('../models/project');      //   fm models/projects:  exports.Project = Project;



// const URL_MONGODB = "mongodb://localhost:27017/data/db"; NOPE

// eg. the environment var in an .env file could look like this:
// DATABASE_URL=mongodb://localhost:27017/node-express-mongodb-server

// The database URL can seen when you start up 
// MongoDB on the command line. You only need 
// to define a subpath for the URL 
// to define a specific database. 
// If the database doesn't exist yet, 
// MongoDB will create one for you.


const connectDb = () => {    // Does it still work if I disconnect this? NO - bc use this in main index!!! 
    // add error logging! 
    // When createProjectSeedData() was never reached, this was never being invoked.....
    console.log("!!!!!!!!!!!!!************ connectDb from LOADERS was called!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!************ connectDb from LOADERS was called!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!************ connectDb from LOADERS was called!!!!!!!!!!!!!!!!!!!!")
    return mongoose.connect(URL_MONGODB);
    // return mongoose.connect(process.env.DATABASE_URL);
};




// // connectDb.on('error', (error) => console.error(error))    // connectDb.on is not a function  :( 
// // db.once('open', () => console.log('connected to database'))


// // const models = { User, Message };  // export as list, doesn't like
// // const models = { Project };   as list.  commented out to resolve error  TypeError: models.models.Project is not a constructor main index.js ln161
// const models = Project;  // YUP! This fixed it 


// // export { connectDb }; // export list. 
// // export default models;
// exports.connectDb = connectDb;  // the MongoDB DataBase  **Connection** itself,  there is a Connection object.. 
// exports.models = models;





// NEXT --------- NEED TO SEED DATABASE !!!!
// //  this version: re-initializes db on every Express server start
const eraseDatabaseOnSync =  true;  // was true, changed bc got error "Cannot read property 'deleteMany' of undefined"
connectDb().then(async () => {
    console.log("INSIDE ASYNC FUNCTION AFTER CONNECTDB EXECUTES")
    if (eraseDatabaseOnSync && Project !== undefined) {
        await Promise.all([
            models.models.Project.deleteMany({}),
        ])
        createProjectSeedData();
    }
    // await createProjectSeedData();

    app.listen(PORT_MONGODB , () =>
      console.log(`Now listening on port  ------------ ${PORT_MONGODB}!`),
      console.log(`Now listening on url ------------ ${URL_MONGODB}!`),
    );
});


const createProjectSeedData= async () => {
    let project1ImagesLocations = [
        "/Users/tori/Desktop/TV_images/DiyOrDont1.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont2.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont3.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont4.png",
        "/Users/tori/Desktop/TV_images/DiyOrDont5.png"
    ];
    let project2ImagesLocations = [
        "/Users/tori/Desktop/TV_images/Bodega1.png",
        "/Users/tori/Desktop/TV_images/Bodega2.png",
        "/Users/tori/Desktop/TV_images/Bodega3.png",
        "/Users/tori/Desktop/TV_images/Bodega4.png"
    ];
    let project3ImagesLocations = [
        "/Users/tori/Desktop/TV_images/WindSolar1.png",
        "/Users/tori/Desktop/TV_images/WindSolar2.png",
        "/Users/tori/Desktop/TV_images/WindSolar3.png"
    ];
    let project4ImagesLocations = [
        "/Users/tori/Desktop/TV_images/YogaSequencer1.png",
        "/Users/tori/Desktop/TV_images/YogaSequencer2.png",
        "/Users/tori/Desktop/TV_images/YogaSequencer3.png"
    ];



    const project1 = new models.models.Project({
      name: "DIY Or Don't  (FROM MONGO SEED DATA)",
      description: "Research, read, & leave reviews of home improvement projects, add projects to your list, manage your toolbox and shopping list, have your shopping list texted to you.",
      link: "http://diy-or-dont-frontend.herokuapp.com/login",
      languages: ["React", "JavaScript", "HTML", "CSS", "Ruby", "Ruby on Rails"], 
      year: 2019,
      images: []
    });
    await project1ImagesLocations.forEach(img => project1["images"].push(processImageUpload(img)));
    await project1.save();

    const project2 = new models.models.Project({
      name: "Bodega Review App",
      description: "Locate the best bodega by map as rated for its coffee, cat, etc.",
      languages: ["React", "JavaScript", "HTML", "CSS", "Ruby", "Ruby on Rails"], 
      libraries: ["Mapbox"], 
      year: 2019,
      images: []
    });
    await project2ImagesLocations.forEach(img => project2["images"].push(processImageUpload(img)));
    await project2.save();

    const project3 = new models.models.Project({
        name: "Wind vs Solar Energy ROI",
        description: "See if your location is a better fit for wind or solar energy!",
        languages: ["Ruby On Rails", "Ruby", "HTML", "Custom CSS", ], 
        libraries: ["ERB - monolithic app", "NOAA API", "Scraped Wind Energy Data"], 
        year: 2019,
        images: []
      });
      await project3ImagesLocations.forEach(img => project3["images"].push(processImageUpload(img)));
      await project3.save();

      const project4 = new models.models.Project({
        name: "Yoga Sequencer",
        description: "",
        languages: ["Vanilla JavaScript", "Custom HTML", "Custom CSS", "Ruby", "Ruby on Rails"], 
        libraries: ["none - manually specified!!!!  "],
        year: 2019,
        images: []
      });
      await project4ImagesLocations.forEach(img => project4["images"].push(processImageUpload(img)));
      await project4.save();

};















// SetUp per :   https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// //Import the mongoose module
// var mongoose = require('mongoose');

// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, { useNewUrlParser: true });

// // get the default Connection object with mongoose.connection.
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

