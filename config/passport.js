//config/passprt.js

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser(function (user, done) {
  console.log("11111" + user);
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log("22222" + user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("accessToken: ", accessToken);
      var user = profile;

      done(null, user);
    }
  )
);

module.exports = passport;
