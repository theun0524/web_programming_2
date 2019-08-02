var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();

// Import the mongoose module
var mongoose = require('mongoose');

// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/todos';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;