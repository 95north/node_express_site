const express = require('express');
const bodyParser = require('body-parser');
const store = require('./src/services/store'); //****** KNEX TO CONNECT TO MySQL DATABASE !!!!  */


const URL_MONGODB = "mongodb://localhost:27017/portfoliodb";  // "mongodb://localhost:27017/data/db";  //"mongodb://localhost:27017";           // *** Location of db??!
const PORT_MONGODB = "27017";
// mongodb://<HOSTNAME>:<PORT>/<DBNAME>
// for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial
const models = require('./src/models');       // all Models.  ATM is just Projects
const connectDb = require('./src/models');    // the MongoDB database Connection itself 
const allProjects = require('./src/api/routes/project.js');   // SHOULD MOVE THIS LATER !!!! to controller or svc. 


// var cors = require('cors')  // Don't need, specify CORS below instead. 
const app = express();


app.use(express.static('public'))
app.use(bodyParser.json())
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







 

app.get('/allprojects', async function (req, res) {
      function getProjectsFromMongoDB(){
          return allProjects.allProjects();
      }

      let theData = await getProjectsFromMongoDB();

      return res.status(200).send({
          success: 'true',
          projectsArray: theData
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
        const project1 = new models.models.Project({
          name: "DIY Or Don't",
          description: "Research, read, & leave reviews of home improvement projects, add projects to your list, manage your toolbox and shopping list, have your shopping list texted to you.",
          link: "http://diy-or-dont-frontend.herokuapp.com/login",
          languages: ["React", "JavaScript", "HTML", "CSS", "Ruby", "Ruby on Rails"], 
          year: 2019
        });
        await project1.save();
        const project2 = new models.models.Project({
          name: "Bodega Review App",
          description: "Locate the best bodega by map as rated for its coffee, cat, etc.",
          languages: ["React", "JavaScript", "HTML", "CSS", "Ruby", "Ruby on Rails"], 
          libraries: ["Mapbox"], 
          year: 2019
        });
        await project2.save();
    };











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











