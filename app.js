const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const artistsRouter = require('./routes/artists');
const spacesRouter = require('./routes/spaces');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  res.locals.currentUser = req.session.currentUser;
  next();
});

app.use(flash());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/artists', artistsRouter);
app.use('/spaces', spacesRouter);

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// error handler
// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  if (err.status === 404) {
    res.render('not-found');
  } else {
  // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500);
      res.render('error');
    }
  }
});

module.exports = app;
