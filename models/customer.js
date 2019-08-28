const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


// define schema
const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold:{
        type: Boolean,
        default:false
    },
    phone :{
        type: String,
        required:true,
        minlength:11,
        maxlength:15
    }
})


//define model 
const Customer = mongoose.model('Customer', customerSchema)


//validation function with Joi

function validateCustomers(data) {
    const schema = {
        name:Joi.string().min(5).max(20).required(),
        phone:Joi.required(),
        isGold:Joi.boolean().required()
        
    }
    
    return Joi.validate(data, schema)
}


exports.Customer=Customer;
exports.validateCustomers = validateCustomers