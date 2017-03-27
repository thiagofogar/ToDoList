// server.js
'use strict';

// modules =================================================
var express        = require('express');
var app            = express();
var port           = process.env.PORT || 8080; 
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var configDB       = require('./server/config/db')

//Database
mongoose.connect(configDB.url); 

//Express
app.use(bodyParser.json()); 
app.use(express.static('./public')); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// routes
require('./server/routes')(app); // configure our routes

// start
app.listen(port);               

console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
