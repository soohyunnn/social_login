let passport = require("passport"); //passport 추가
let NaverStrategy = require("passport-naver").Strategy;

/* naver 로그인 연동
 *
 */
router.get("/naver", passport.authenticate("naver", null), function (req, res) {
  console.log("/main/naver");
});

//처리 후 callback 처리 부분 성공/실패 시 리다이렉트 설정
router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    successRedirect: "/",
    failureRedirect: "/main/login",
  })
);

passport.use(
  new NaverStrategy(
    {
      clientID: config.authLogin.naver.client_id,
      clientSecret: config.authLogin.naver.secret_id,
      callbackURL: config.authLogin.naver.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        var user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: "naver",
          naver: profile._json,
        };
        console.log("user=");
        console.log(user);

        return done(null, user);
      });
    }
  )
);

//failed to serialize user into session 에러 발생 시 아래의 내용을 추가 한다.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (req, user, done) {
  // passport로 로그인 처리 후 해당 정보를 session에 담는다.
  req.session.sid = user.name;
  console.log("Session Check :" + req.session.sid);
  done(null, user);
});
