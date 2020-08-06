// DEPENDENCIES AND VARIABLES
// ===============================================
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const compression = require('compression')
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();


// HANDLEBAR SETUP
// =====================================================
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// EXPRESS CONFIGURATION
// =====================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression())

// STATIC DIRECTORY
// =====================================================
app.use(express.static("public"));


// MONGOOSE
// =====================================================
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hugs", {
  useNewUrlParser: true,
});


// SESSION
// =====================================================
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7200000
  }
}))


// ROUTES
// =====================================================
// API ROUTES
app.use(require("./controllers/apiRoutes.js"));
// HTML ROUTES
app.use(require("./controllers/htmlRoutes.js"));


// =====================================================
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});