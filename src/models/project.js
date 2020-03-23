// for mongoDB, fm https://www.robinwieruch.de/mongodb-express-setup-tutorial
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// Alternate Syntax !!! 
//var Item = new ItemSchema(
//   { img: 
//       // Buffer type allows store our image as data (arrays)
//       { data: Buffer, contentType: String }   
//   }
// );

const projectSchema = new mongoose.Schema(
    { 
        name: String,
        description: String,
        link: String,
        notes: String,
        year: { type: Number, min: 2000, max: 2050 },
        updated: { type: Date, default: Date.now },  
        languages: [{type: String}], 
        libraries: [{type: String}],
        image: {   //Refactor later to store multiple images? 
        // Buffer type allows store our image as data (arrays)
                data: Buffer, 
                contentType: String 
        },
    }
);


const Project = mongoose.model('Project', projectSchema);

exports.Project = Project;

