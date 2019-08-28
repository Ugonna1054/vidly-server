const express = require('express');
const router = express.Router();
const {Customer, validateCustomers} = require('../models/customer');



//get request

router.get('/', (req, res)=>{

    Customer.find().sort('name')
    .then(response => {
        //Check for route errors
    if (!response) return res.status(404).send('This page does not exist')

    res.send(response)
    })
    .catch(err=>{console.log(err);
        res.status(404).send('This page does not exist')
    })

})




router.get('/:id', (req, res)=>{

    Customer.findById(req.params.id).sort('name')
    .then(response=>{

    //Check for route errors
    if (!response) return res.status(404).send('This page does not exist')
    res.send(response)

    })    
    .catch(err=>{console.log(err);
        res.status(404).send('This page does not exist')
    })
})

//post request

router.post('/', (req, res) => {
    
    //Check for validation errors
    const {error} = validateCustomers(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // init genre
    let customers = new Customer ({ 
        name : req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    // save to database
    customers.save()
    .then((response)=>{
         res.send(response)
    })
    .catch(err=>{console.log(err);
       res.send(err)})
        
 })

//put request

router.put('/:id', (req, res)=>{
   
     //Check for validation errors
     const {error} = validateCustomers(req.body);
     if(error) return res.status(400).send(error)

    //update
    Customer.findByIdAndUpdate(req.params.id, {
        $set:{
            name:req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, {new:true})
    .then(response=>{  
        res.send(response)
    })
    .catch(err=>{console.log(err);
        res.status(404).send('This page does not exist')
    })


})

//delete request

router.delete('/:id', (req, res)=>{

    Customer.findByIdAndRemove(req.params.id)
    .then (response=>{   
     res.send(response);
    })
    .catch(err=>{console.log(err);
        res.status(404).send('This page does not exist')
    })  
})


module.exports= router

