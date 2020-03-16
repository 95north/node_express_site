const express = require('express')
const bodyParser = require('body-parser')
const store = require('./src/services/store') //****** */
// var cors = require('cors')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
// app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})


app.post('/login', (req, res) => {
  store
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


app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})




