// DEPENDENCIES
// ======================================================
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

// ROUTES
// ======================================================

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("logout");
})



// EXPORT
// ======================================================
module.exports = router;