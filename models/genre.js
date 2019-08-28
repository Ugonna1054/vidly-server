const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


// define schema
const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
})


//define model 
const Genre = mongoose.model('Genre', genreSchema)


//validation function with Joi

function validateGenres(data) {
    const schema = {
        name:Joi.string().min(5).max(20).required(),
    }
    
    return Joi.validate(data, schema)
}

exports.Genre = Genre;
exports.validateGenres = validateGenres;
exports.genreSchema = genreSchema;