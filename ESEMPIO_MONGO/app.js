var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var moviesRouter= require('./routes/movies'); //aggiunto 
var advancedRouter = require('./routes/advanced-search'); // aggiunto

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter); //aggiunto url di movie
app.use('/advanced-search', advancedRouter); //aggiunto url di advanced-search per attori
module.exports = app;
