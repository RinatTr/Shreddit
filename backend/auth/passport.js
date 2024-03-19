const { db } = require("../queries/q-index.js");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const passport = require('passport')
require('dotenv').config();

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_JWT;

console.log("[AUTH:] init JWT strategy")
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  //Passport will go here to authenticate protected paths
  console.log("[AUTH:] Authenticating request...")
  db.one("SELECT * FROM users WHERE username = ${username}", {
    username: jwt_payload.username
  })
    .then(user => {
      console.log('[AUTH:] User authenticated:', user.username);
      done(null, user.username);
    })
    .catch(err => {
      if (err.code == "0") {
        console.log('[AUTH:] user does not exist');
        //error code 0 = no data returned from DB query, meaning username doesn't exist
        done(null, false)
      } else {
        console.log('[AUTH:] JWT authentication failed');
        done(err, false);
      }
    });
}
))