const express = require('express');
const bodyParser = require('body-parser');      // body-parser package so we can receive JSON data in our payloads
const store = require('./src/services/store');  //****** KNEX TO CONNECT TO MySQL DATABASE !!!!  */


const URL_MONGODB = "mongodb://localhost:27017/portfoliodb";  // "mongodb://localhost:27017/data/db";  //"mongodb://localhost:27017";           // *** Location of db??!
const PORT_MONGODB = "27017";
// mongodb://<HOSTNAME>:<PORT>/<DBNAME>
// for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial
const models = require('./src/models');       // all Models.  ATM is just Projects
const connectDb = require('./src/models');    // the MongoDB database Connection itself 
const allProjects = require('./src/api/routes/project.js');   // SHOULD MOVE THIS LATER !!!! to controller or svc. 
const aProject = require('./src/api/routes/project.js');   // SHOULD MOVE THIS LATER !!!! to controller or svc. 
// to store images as binData in MongoDB document: 
const fs = require('fs');
const Binary = require('mongodb').Binary;


// var cors = require('cors')  // Don't need, specify CORS below instead. 
const app = express();


// .use is middleware that allows you to run code when the server gets a request but before it gets passed to your routes.
app.use(express.static('public'))
app.use(bodyParser.json())
// app.use(BodyParser.urlencoded({ extended: true }));    // What is this for? is in addition to app.use(bodyParser.json())
// app.use(cors())    Don't need anymore - 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});









// ---- MySQL   KNEX    User + Auth Routes ---- 
// body-parser middleware-grabs the HTTP body, decodes the info, appends it 
// to the req.body
app.post('/book', (req, res) => {
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});


app.get('/', (req, res) => {
    // res.sendStatus(200)
    res.json({info: "Testing!"})
})


app.post('/createUser', (req, res) => {
    store                     // store = KNEX -- MySQL
      .createUser({
        username: req.body.username,
        password: req.body.password
      })
      .then(() => res.sendStatus(200))
})


app.post('/login', (req, res) => {
    store                     // store = KNEX -- MySQL
      .authenticate({
          username: req.body.username,
          password: req.body.password
      })
      //.then(({ success }) => {
      .then(( resp ) => {
          console.log("In Backend Index post login response. uInfo is: ", resp.uinfo)
          if (resp.success) {       // need to change to add === true ? 
            // res.sendStatus(200)
            const userinfo = resp.uinfo;   
            return res.status(200).send({
              success: 'true',
              message: 'retrieved successfully',
              // body: success   // get body: true   when console log
              userinfo
            });
          } else {
            res.sendStatus(401)
          }
      })
})


// PORT for MySQL + KNEX .   Looks like it works running 2 ports for 2 DBs! 
app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})







 
// ----  mongoDB    Project Routes ---- 
app.get('/allprojects', async function (req, res) {
      function getProjectsFromMongoDB(){
          return allProjects.allProjects();
      }

      let theData = await getProjectsFromMongoDB();

      return res.status(200).send({
          success: 'true',
          projectsArray: theData,
      })
})


app.get('/p', async function (req, res) {
    // console.log("in aProject, res is: ", res)   //  a ServerResponse obj!  Interesting to look at! 
    function getAProjectFromMongoDB(){
        return aProject.aProject();
    }
    let theData = await getAProjectFromMongoDB();
    // return  theData.json();        // Error : TypeError: theData.json is not a function
    // return res.json(theData);      // This works.  It likes this. 
    return res.status(200).send({
        theData
    })
})










// ----mongoDB----, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial
// Basic DB connection setup:
    // connectDb().then(async () => {
    //   app.listen(process.env.PORT, () =>
    //     console.log(`Example app listening on port ${process.env.PORT}!`),
    //   );
    // });


//  this version: re-initializes db on every Express server start
    const eraseDatabaseOnSync =  true;  // was true, changed bc got error "Cannot read property 'deleteMany' of undefined"
    connectDb.connectDb().then(async () => {
        if (eraseDatabaseOnSync) {
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






    const processImageUpload = (imgLocation) => {
        // ??? best practice was to store image location and other such metadata to the DB and store the image file to disk.
        // base64 encode the image, 
        // then store it using mongo's BinData type. 
        // As I understand, that will save as BSON bit array, 
        // not actually store the base64 string, so the size won't grow larger than your original binary image.
        // It will display in json queries as a base64 string.

        // https://stackoverflow.com/questions/52285059/when-storing-binary-data-in-mongodb-is-it-stored-as-binary-or-base64-internally
        // <bindata> is "the base64 representation of a binary string", according to this: BSON Data Types and Associated Representations - Binary


        // Binary() - constructor - A class representation of the BSON Binary type. (from MongoDB)
        // Arguments:       buffer (buffer) – a buffer object containing the binary data.
        // Argument2:       [subType] (number) – the option binary type
        // https://mongodb.github.io/node-mongodb-native/api-bson-generated/binary.html

        var img = fs.readFileSync(imgLocation);     // const fs = require('fs');
        // print it out so you can check that the file is loaded correctly
        console.log("Loading image file");
        console.log("uploaded img is : ", img);  //  uploaded img is :  <Buffer 89 50 4e 47 0d 
        

        // return img  // what if just return Buffer instead? 

        var imageBin = {};
        imageBin.bin = Binary(img);                 // const Binary = require('mongodb').Binary;
        // console.log("type of imageBin.bin is : ", typeof imageBin.bin) // "object"
        console.log("imageBin.bin is instance of Binary? : ", imageBin.bin instanceof Binary) // true
        console.log("largo de invoice.bin= "+ imageBin.bin.length());
        console.log("Buffer.isEncoding(utf8) :", Buffer.isEncoding("utf8")) // returns true for both utf8 and binary.... 
        console.log("Buffer.isEncoding(binary) :", Buffer.isEncoding("binary"))  // returns true for both utf8 and binary.... 
        return imageBin.bin
        // What gets inserted into MongoDB: 
        //  images: [ 'BinData(0, ' + '"iVBORw0KGgoAAAANSUhEUgAABmwAAAQoCAYAAAAHVfHnAAAMJWlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU8kagOeWJCQktEAEpITeBJFepNcIAlIFGyEJJJQYEoKKHVlUcC2oiGBFV0....


        // let encodedPic = window.btoa(img);  // ReferenceError: window is not defined
        // return encodedPic;





        // set an ID for the document for easy retrieval ::: 
        // imageBin._id = 12345; 
        //   mongo.connect('mongodb://localhost:27017/nogrid', function(err, db) {
        //   if(err) console.log(err);
        //      db.collection('invoices').insert(imageBin, function(err, doc){
        //     if(err) console.log(err);
        //   // check the inserted document :::
        //     console.log("Inserting file");
        //     console.log(doc);
        
        //     db.collection('invoices').findOne({_id : 12345}, function(err, doc){
        //       if (err) {
        //         console.error(err);
        //         }
        
        //       fs.writeFile('vcout.exe', doc.bin.buffer, function(err){
        //           if (err) throw err;
        //           console.log('Sucessfully saved!');
        //     });
        
        //     });
        //   });
        // });  // ends mongo.connect






    // https://stackoverflow.com/questions/11442356/storing-some-small-under-1mb-files-with-mongodb-in-nodejs-without-gridfs
        // var fs = require('fs');
        // var mongo = require('mongodb').MongoClient;
        // var Binary = require('mongodb').Binary;
        
        // var archivobin = fs.readFileSync("vc.exe"); 
        // // print it out so you can check that the file is loaded correctly
        // console.log("Loading file");
        // console.log(archivobin);
        
        // var invoice = {};
        // invoice.bin = Binary(archivobin);
        
        // console.log("largo de invoice.bin= "+ invoice.bin.length());
        // // set an ID for the document for easy retrieval
        // invoice._id = 12345; 
        //   mongo.connect('mongodb://localhost:27017/nogrid', function(err, db) {
        //   if(err) console.log(err);
        //      db.collection('invoices').insert(invoice, function(err, doc){
        //     if(err) console.log(err);
        //   // check the inserted document
        //     console.log("Inserting file");
        //     console.log(doc);
        
        //     db.collection('invoices').findOne({_id : 12345}, function(err, doc){
        //       if (err) {
        //         console.error(err);
        //         }
        
        //       fs.writeFile('vcout.exe', doc.bin.buffer, function(err){
        //           if (err) throw err;
        //           console.log('Sucessfully saved!');
        //     });
        
        //     });
        //   });
        // });

    }       // ends  processImageUpload












// fm  https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
// mongoDB server-side logic
// 1. define database schema -- moved to Models folder!

    // var Item = new ItemSchema(
    //   { img: 
    //       // Buffer type allows store our image as data (arrays)
    //       { data: Buffer, contentType: String }   
    //   }
    // );
    // var Item = mongoose.model('Clothes',ItemSchema);

// path of image uploading. 
// Multer - middleware - uploads photos on the server side
    // app.use(multer({ dest: ‘./uploads/’,
    //   rename: function (fieldname, filename) {
    //     return filename;
    //   },
    //  }));

 // post to DB
    //  app.post(‘/api/photo’,function(req,res){
    //   var newItem = new Item();     // create instance of Item model.
    //   newItem.img.data = fs.readFileSync(req.files.userPhoto.path)  // actual image. sb <Binary Data>
    //   newItem.img.contentType = ‘image/png’;  // specifies file type
    //   newItem.save();
    //  });











