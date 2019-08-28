const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Sign in User
router.post('/', async (req, res) => {
  //Check for validation errors
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  //check for correct email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');
  //check for correct pasword
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  // using JWT to create token and storing the token in a secret in an Env variable 
  const token = user.generateAuthToken()
  res.send(token);
});

//Signout User

// router.delete('/me', async (req, res) => {
//   try {
//     let user = await User.findById(req.user._id)
//     const token = user.generateAuthToken()
//      await user.remove(token)
//     res.send(user);
//   }

//   catch (err) {
//     console.log(err);
//     res.status(400).send(err)
//   }
// });



function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 


//never store tokens in databases or on the server