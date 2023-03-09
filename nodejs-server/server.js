'use strict';
require('dotenv').config();
let express = require('express'),
app = express(),
port = process.env.EXPRESS_PORT || 3000,
bodyParser = require('body-parser'),
jsonwebtoken = require("jsonwebtoken"),
cookieParser = require('cookie-parser');

//setting up the view engine
app.set('view engine', 'ejs')

//setting up the static files
app.use('/public', express.static('public'))

// setting up cookie parser
app.use(cookieParser());

// mongoose instance creation
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const option = {
    dbName: process.env.MONGODB_DBNAME,
    socketTimeoutMS: 30000,
    keepAlive: true
};

//connecting to the database
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, option).then(function(){
    console.log("MongoDB is connected");
}, function(err) {
    console.log("MongoDB failed to connect", err);
});

// mongoose model creation
require('./api/db/models/userModels.js');
require('./api/db/models/tokenModel.js');

// setting up bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware jwt signature verification
app.use(function(req, res, next) {
    const token = req.cookies.access_token;
    if (token) {
        try {
            jsonwebtoken.verify(token, process.env.JWT_SECRET, function(err, decode) {
                req.user = decode;
                next();
        });
        }
        catch(err) {
            req.user = undefined;
            next();
        }
    } else {
        req.user = undefined;
        next();
    }
});

// routes
require('./api/routes/userRoutes')(app);
require('./api/routes/authRoutes')(app);
require('./api/routes/mainRoutes')(app);
require('./api/routes/vendorRoutes')(app);
require('./api/routes/adminRoutes')(app);

//  error 404 page handler
app.use(function(req, res) {
    res.render('errorPage', { url: req.originalUrl, error: '404 Page Introuvable' })
});

app.listen(port);

console.log('server started on: ' + port);

module.exports = app;