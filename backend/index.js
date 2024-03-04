const express = require('express');
const passport = require("passport");
const session = require("express-session");
const users = require('./routes/users.js')
const posts = require('./routes/posts.js')
const comments = require('./routes/comments.js')
const follows = require('./routes/follows.js')
const subscriptions = require('./routes/subscriptions.js')
const subshreddits = require('./routes/subshreddits.js')
const logSends = require('./logSends')
const corsConfig = require('./cors.config')


const app = express()
//CORS configuration needs to be applied as early as possible in the middleware chain. This ensures that CORS headers are set on the response before any potential errors occur during body parsing.
app.use(corsConfig);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, "../frontend/build")))

console.log("[AUTH:] init session")
app.use(
  session({
    secret: "shreddit passport",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1 * 24 * 60 * 60 * 1000} //one day in miliseconds
  })
);

//must be ordered before routes
app.use(passport.initialize());
app.use(passport.session());

app.use((req, _, next)=> {
  console.log(req.method, "req:", req.originalUrl, req.sessionID, "cookie:", req.session.cookie.expires, req.session.cookie.httpOnly)
  next()
})

app.use(logSends)

app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/comments', comments)
app.use('/api/subshreddits', subshreddits)
app.use('/api/follows', follows)
app.use('/api/subscriptions', subscriptions)

app.get('/', (_, res) => {
  res.send('Shreddit-api server running')
})
// app.use('*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, _, next) {

  console.log("req in catch 404:", req.originalUrl)
  var err = new Error("Resource Not Found");
  err.status = 404;
  err.message = "Requested resource or path not found"
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  //User-fault login failure error:
  if (req.originalUrl === '/api/users/auth/login' && err.code === 0) {
    //queryResultErrorCodes: https://vitaly-t.github.io/pg-promise/errors_query-result-error.js.html
    res.status(401).json({ message: "User doesn't exist" });
  } else {
    // render the error page
    res.status(err.status || 500);
    res.json({ message: err.message,
               error: err.code });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Shreddit: ${process.env.NODE_ENV} listening to ${process.env.PORT}`);
})
