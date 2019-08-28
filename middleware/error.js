const winston = require('winston')

module.exports = function (err, req, res, next) {
    winston.error(err)
    res.status(500).send('Somethin Failed..Couldnt connect to server')
}