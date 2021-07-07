require('dotenv').config();
const express = require('express')
    , http = require('http')
    , bodyParser = require('body-parser')
    , app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// start server
const server = http.Server(app)

// routes
require('./routes.js')(app)

// 404 errors
app.use(function (req,res,next){
    res.status(404).send('Error 404: File Not Found');
});

// listen to port
server.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})