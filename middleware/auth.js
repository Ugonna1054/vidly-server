const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function auth(req, res, next) {
   const token = req.header('x-auth-token')
   if (!token) return res.status(401).send('Access Denied');

   try {
    const decoded = jwt.verify(token, config.get('myPrivateKey'));
    req.user = decoded; //we now have access to the users request like req._id
    next() 
   }

   catch (err) {
       res.status(400).send('Invalid Token')
   }
}

