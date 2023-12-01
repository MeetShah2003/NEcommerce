const { Router } = require("express");
const {
  signupPage,
  loginPage,
  signUp,
  login,
  homePage,
  userEmail,
  useremailPage,
  otpPage,
} = require("../controller/user.controller");
const passport = require("passport");
const userRoute = Router();

userRoute.get("/signup", signupPage);
userRoute.post("/signup", signUp);
userRoute.get("/login", loginPage);
userRoute.post("/login", login);
userRoute.get("/useremailPage",useremailPage);
userRoute.post("/useremail",userEmail);
userRoute.get("/verifyotp",otpPage);
userRoute.post("/verifyotp/:id");
userRoute.get("/home", homePage);
userRoute.get("/auth/google",passport.authenticate("google", { scope: ["profile"] }));
userRoute.get("/auth/google/callback",passport.authenticate("google", { failureRedirect: "/login" }),   (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect("/home");
});

module.exports = { userRoute };
