const passport = require("passport");
const { db } = require("../queries/q-index.js");

module.exports = () => {
  passport.serializeUser((user, done) => {
//processes a user token into plain text, which is
//how it can be assigned to our request header.
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
//takes a plain text request header, converts it into a JavaScript-readable format,
//and checks our database to make sure that user actually exists.
//This accomplishes two things: It lets us process a session token,
//and it makes sure a hacker isn't throwing together a request
//header without an actual user account to back it up.
    db.one("SELECT * FROM users WHERE username = ${username}", {
      username: username
    })
      .then(user => {
        done(null, user.username);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
