var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
require('dotenv').config();

require('./config/database');
// new code below
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const quotesRouter = require('./routes/quotes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// app.get('/quotes', async function (req,res) {
//   const apiResponse = await fetch('https://oqaas.vercel.app/api/q')
//   // const apiResponse = await fetch('https://oqaas.vercel.app/api/a')
//   console.log(apiResponse);
//   const quote = apiResponse
//   res.render('/quotes', {quote})
// });

// fetch('https://oqaas.vercel.app/api/q')
//   .then((response) => response.json())
//   .then((data) => {
//     if (data && data.name && data.quote) {
//       const name = data.name;
//       const quote = data.quote;
//       console.log(`Name: ${name}`);
//       console.log(`Quote: ${quote}`);
//     } else {
//       console.error('Invalid or missing data in the API response.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error fetching data from the API:', error);
//   });

app.get('/munderDifflin/quotes', async (req, res) => {
  try {
    const response = await fetch('https://oqaas.vercel.app/api/a');
    const data = await response.json();

    if (Array.isArray(data)) {
      const quotes = data.map((item) => ({
        name: item.name,
        quote: item.quote,
      }));
      
      res.render('munderDifflin/quotes', { quotes });
    } else {
      console.error('Invalid or missing data in the API response.');
      res.status(500).send('Error: Invalid or missing data in the API response.');
    }
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Error: Unable to fetch data from the API.');
  }
});









app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quotes', quotesRouter);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
