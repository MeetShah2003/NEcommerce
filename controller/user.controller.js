const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator=require("otp-generator");
const { userModel } = require("../models/user.schema");
require("dotenv").config();

let OTP;

const signupPage = (req, res) => {
  res.render("signup");
};

const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).send({ message: "user already exist" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err.message);
        } else {
          const user = await userModel.create({
            username,
            email,
            password: hash,
            role,
          });
          console.log(user);
          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET
          );
          return res
            .status(200)
            // .cookie("userId", user._id)
            .cookie("token", token)
            // .cookie("role", user.role)
            .redirect("/user/login");
        }
      });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const loginPage = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userModel.findOne({ email: email });
    if (data) {
      bcrypt.compare(password, data.password, (err, result) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        if (result) {
          const token = jwt.sign(
            { id: data._id, role: data.role },
            process.env.JWT_SECRET
          );
          return res
            .status(200)
            // .cookie("userId", data.id)
            .cookie("token", token)
            .redirect("/product/homeProduct");
        } else {
          return res.status(200).send({ message: "invalid password" });
        }
      });
    } else {
      return res.status(400).send({ message: "user not found" });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.EMAIL_PASS,
  },
});

const userEmail = (req, res) => {
  const { to } = req.body;
  OTP=otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
  const email = {
    to,
    subject:"ONE TIME VERIFICATION(OTP)",
    html: `<a href="http://localhost:8090/user/useremail/${OTP}">Verify your OTP</a>your ONE TIME VERIFICATION(OTP) is ${OTP}`,
  };
  transport.sendMail(email, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(info);
    }
    console.log(email);
  });
  return res.status(200).redirect("/verifyotp");
};

const verifyOtp=(req,res)=>{
  let {token}=req.params;
  if(token==OTP){
    return res.status(200).redirect("/user/login");
  }
  else{
    return res.status(400).send({message:"invalid otp"});
  }
};

module.exports = {
  signupPage,
  signUp,
  loginPage,
  login,
  userEmail,
  verifyOtp
};
