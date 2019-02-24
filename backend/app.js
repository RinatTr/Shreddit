const express = require('express');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const session = require("express-session");
const users = require('./routes/users.js')
const posts = require('./routes/posts.js')
const subshreddits = require('./routes/subshreddits.js')
const app = express()

app.use(cookieParser("shreddit passport"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    secret: "shreddit passport",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/subshreddits', subshreddits)

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

app.listen(3100, () => {
  console.log('Shreddit: listening to 3100');
})
