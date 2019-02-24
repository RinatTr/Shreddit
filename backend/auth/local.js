/*determines whether or not we will, in fact,
assign a session token to a user who is logging in
- in other words, we make sure to check whether the
user exists in the database and whether the provided
password is correct.*/
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const helpers = require("./helpers");

const { db } = require('../queries/q-index')

// WHERE id = $1`, [post_id])
passport.use(
  new LocalStrategy((username, password, done) => {
    db.one("SELECT * FROM users WHERE username = ${username}", {
      username: username
    }) //username coming from the body of the request
      .then(user => {
        if (!helpers.comparePass(password, user.password_digest)) {
          return done(null, false); //done allows it to go to the next middleware
        } else {
          console.log("correct pass", done);
          return done(null, user);
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

init();

module.exports = passport;
