const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

//function to generate token

userSchema.methods.generateAuthToken = function() { 
    let mins = 60
    let hrs = mins * 60
    let d = new Date ()
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin,name:this.name,iatTime:new Date(d.getTime()),expTime:new Date((d.getTime()) + ( mins*  1 *  1000))}, config.get('myPrivateKey'), {expiresIn:'0.01h'})
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser; 