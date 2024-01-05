const passport = require("passport");
const { db } = require("../queries/q-index.js");

module.exports = () => {
  console.log("[AUTH:] init serializer")
  passport.serializeUser((user, done) => {
    console.log('[AUTH:] Serialized user:', user.username);
//processes a user token into plain text, which is
//how it can be assigned to our request header.
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    console.log('[AUTH:] Deserializing user:', username);
/*
Deserialization occurs on subsequent requests.
When a user makes a new request, Passport.js middleware (e.g., passport.initialize() 
and passport.session()) checks if there is a session associated with the request.
If a session exists, the deserializeUser function is called with the serialized user
data stored in the session.
*/
//takes a plain text request header, converts it into a JavaScript-readable format,
//and checks our database to make sure that user actually exists.
//This accomplishes two things: It lets us process a session token,
//and it makes sure a hacker isn't throwing together a request
//header without an actual user account to back it up.
    db.one("SELECT * FROM users WHERE username = ${username}", {
      username: username
    })
      .then(user => {
        console.log('[AUTH:] Deserialized user:', user.username);
        done(null, user.username);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
