const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../queries/q-users.js');
const db = require("../queries/q-users.js");
const passport = require("../auth/local.js");
const { loginRequired } = require("../auth/helpers");

router.get('/', getAllUsers)

router.post("/new", db.createUser);
router.post("/login", passport.authenticate("local", {}), db.loginUser);
router.get("/isLoggedIn", db.isLoggedIn);
router.post("/logout", loginRequired, db.logoutUser);


//add loginRequired to each protected route
module.exports = router;
