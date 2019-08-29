 const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



//Get current User 

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password'); //Other properties can be excluded from the user like credit card details e.t.c
    res.send(user);
});

//get All users
router.get('/', async (req, res)=>{
    try {  
        let user = await  User.find().sort('name');
        if(!user)  return res.status(404).send('This page does not exist')
        res.send(user)
    }
    catch (err) {res.status(404).send('This page does not exist')}
})


//post request Create new user
router.post('/', async (req, res) => {
 try {
 //check for validation errors
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 //check for already registered user 
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

// init model using lodash to hide password from user
    user = new User( _.pick(req.body, ['name', 'email', 'password']));
 //hash password with salt   
  const salt = await bcrypt.genSalt(10);
  user.password =  await bcrypt.hash(user.password, salt)
  await user.save();
  //Login user Automatically after signup
  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
 }

 catch (err) {res.status(400).send(err)}
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
});

module.exports = router; 