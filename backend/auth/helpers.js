const bcrypt = require("bcryptjs");

function comparePass(userPass, databasePass) {
//hashes first (plain) argument and compares it to
//the second (hashed) argument. We have to hash
//instead of decrypt because it is impossible to
//decrypt hashes.
  return bcrypt.compareSync(userPass, databasePass);
}

function createHash(password) {
//it salts and hashes an inputted password and adds
// the user to the database.
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

//middleware that makes sure a user's JWT token is in our request's header under Authorization key.
//will always come after passport.authenticate middleware.
//use this in routes that we want a user to be logged in to access.
function loginRequired(req, res, next) {
  if (!req.user) {
    res.status(401).json({ status: "Forbidden - please log in." });
    return;
  }
  next();
}

module.exports = {
  comparePass,
  createHash,
  loginRequired
};
