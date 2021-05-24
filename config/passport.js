//config/passprt.js

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
let NaverStrategy = require("passport-naver").Strategy;
let KakaoStrategy = require("passport-kakao").Strategy;

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

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: "/auth/naver/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("accessToken: ", accessToken);
      var user = profile;

      done(null, user);
    }
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: "/auth/kakao/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      request.session.kakao = accessToken;
      console.log("123", request.session);
      request.session.save(function (err) {
        console.log("aaa", request.session.kakao);
      });
      //console.log("profile: ", profile);
      //console.log("accessToken", accessToken);
      var user = profile;

      done(null, user);
    }
  )
);

module.exports = passport;
