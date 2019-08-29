const express = require("express");
const app = express();
const winston = require('winston');
const port = process.env.PORT || 5000;
const cors = require('cors')

//ALLOW ACCESS CONTROL
app.use(cors())


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/joi-validation')();
require('./startup/prod')(app)

app.listen(port, ()=>{
    winston.info(`server listening on port ${port}`);    
})
