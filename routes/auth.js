//routes/auth.js

let express = require("express");
let router = express.Router();
let passport = require("../config/passport.js");

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.get("/logout", function (req, res) {
  req.logOut();
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google"), authSuccess);

function authSuccess(req, res) {
  res.redirect("/");
}

module.exports = router;
