const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(_ => winston.info('Connected to vidly db......'))
}