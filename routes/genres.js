const express = require('express');
const router = express.Router();
const {Genre, validateGenres} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')


/*
Global error handler
npm i express-aync-errors to handle route errors
npm i winston to handle logging errors to console
npm i winston-mongodb to handle logging errors to mongodb

*/

//get request

router.get('/', async (req, res, next)=>{
    const genres = await Genre.find().sort('name')
    res.send(genres)
})




router.get('/:id', async (req, res)=>{

    const genres = await Genre.findById(req.params.id).sort('name')
    //Check for route errors
    if (!genres) return res.status(404).send('This page does not exist')
    res.send(genres)
})

//post request

router.post('/', auth, async (req, res) => {
    
    //ensure only authenticated users can post pass the auth middleware
    //Check for validation errors
    const {error} = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    // init genre
    let genre = new Genre ({ name : req.body.name})
    // save to database
    await genre.save()
    res.send(genre)      
 })

//put request

router.put('/:id', auth, async (req, res)=>{
   
     //Check for validation errors
     const {error} = validateGenres(req.body);
     if(error) return res.status(400).send(error)

    //update
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
                $set:{
                    name:req.body.name
                }
            }, {new:true}
        )

    res.send(genre)
})

//delete request

router.delete('/:id', [auth, admin], async (req, res)=>{

    let genre = await Genre.findByIdAndRemove(req.params.id)
    res.send(genre)
})


module.exports = router;
