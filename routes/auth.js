//routes/auth.js

let express = require("express");
let router = express.Router();
let passport = require("../config/passport.js");
let axios = require("axios");

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.get("/logout", function (req, res) {
  req.logout();

  //router.get("accounts.kakao.com/weblogin/account/info");

  const { kakao } = req.session;
  console.log("2334", kakao);

  let unlinkResponse;
  const headers = {
    Authorization: `Bearer ${kakao}`,
  };

  axios.defaults.headers.common["Authorization"] = `Bearer ${kakao}`;
  axios
    .post("https://kapi.kakao.com/v1/user/unlink", { headers })
    .then((res) => {
      // headers: {…} 로 들어감.
      console.log("send ok", res.data);
      req.session.destroy();
    });
  res.redirect("/");

  // try {
  //   unlinkResponse = axios({
  //     method: "POST",
  //     url: "https://kapi.kakao.com/v1/user/unlink",
  //     headers: {
  //       Authorization: `Bearer ${kakao}`,
  //     },
  //   });
  //   console.log("111111111111111");
  //   req.session.destroy();
  //   res.redirect("/");
  // } catch (error) {
  //   return res.json(error.data);
  // }
  // req.session.destroy(() => {
  //   res.clearCookie("connect.sid");
  //   req.session;
  // });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/naver", passport.authenticate("naver", null), function (req, res) {
  console.log("/main/naver");
});

router.get("/kakao", passport.authenticate("kakao"));

router.get("/google/callback", passport.authenticate("google"), authSuccess);

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

function authSuccess(req, res) {
  res.redirect("/");
}

module.exports = router;
