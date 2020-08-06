// DEPENDENCIES
// ======================================================
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");


// ROUTES
// ======================================================
router.get("/api/hugs", (req, res) => {
  User.find({ username: req.body.username}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

router.get("/readsessions", (req, res) => {
  res.json(req.session)
})

router.post("/api/register", ({ body }, res) => {
  User.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/api/login", (req, res) => {
  User.findOne({ username: req.body.username }, (error, user) => {
    if (!user) {
      return res.status(404).send("User does not exist")
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = {
          id: user._id,
          username: user.username,
          hugs: user.hugs
        }
        res.json(user)
      } else {
        res.status(401).send("Incorrect password");
      }
    }
  }).catch(err => {
    res.status(400).json(err)
  })
})

router.put("/api/save", (req, res) => {
  User.update({username:req.body.username}, {$set: {hugs:req.body.hugs}})
  .then(dbHugs => {
    res.json(dbHugs);
  })
  .catch(err => {
    res.json(err);
  });
})


// EXPORT
// ======================================================
module.exports = router;