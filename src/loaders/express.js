// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import routes from '../api';
// import config from '../config';
//  ABOVE ^^^ Style from a tutorial

// Need to export this? 

const express = require('express');
const bodyParser = require('body-parser');      // body-parser package so we can receive JSON data in our payloads
const routes = require('../api');  // OR JUST /api ???!!

// import routes from '../api';



// var cors = require('cors')  // Don't need, specify CORS below instead. 
const app = express();

console.log("Hello from Express loader")
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

// // Load API routes    commmented out.  Don't need?????  bc of above:  const routes = require('../api'); ??????
// app.use(config.api.prefix, routes());


// // PORT for MySQL + KNEX .   Looks like it works running 2 ports for 2 DBs! 
// app.listen(7555, () => {
//     console.log('Server running on http://localhost:7555')
// })



exports.app = app;