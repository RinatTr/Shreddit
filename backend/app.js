const express = require('express');
const path = require('path');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const session = require("express-session");
const users = require('./routes/users.js')
const posts = require('./routes/posts.js')
const comments = require('./routes/comments.js')
const follows = require('./routes/follows.js')
const subscriptions = require('./routes/subscriptions.js')
const subshreddits = require('./routes/subshreddits.js')

if (process.env.NODE_ENV !== 'production') {
  //for DEV: sets NODE_ENV to get env variables from local .env file
  require('dotenv').config();
}

const app = express()

app.use(cookieParser("shreddit passport"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.use(
  session({
    secret: "shreddit passport",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1 * 24 * 60 * 60 * 1000} //one day in miliseconds
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/comments', comments)
app.use('/api/subshreddits', subshreddits)
app.use('/api/follows', follows)
app.use('/api/subscriptions', subscriptions)

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({  message: err.message,
              error: err
              })
});

app.listen(process.env.PORT, () => {
  console.log(`Shreddit: ${process.env.NODE_ENV} listening to ${process.env.PORT}`);
})
