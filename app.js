var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require('./routes/users'));

module.exports = app;
