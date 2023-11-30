const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.schema");

const signupPage = (req, res) => {
  res.render("signup");
};

const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
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
          return res.status(200).redirect("/login");
        }
      });
    } else {
      return res.status(400).send({ message: "user already exist" });
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
    const data = await userModel.findOne({ email });
    if (data) {
      bcrypt.compare(password, data.password, (err, result) => {
        if (err) {
          return res.status(200).send({ message: err.message });
        } else {
          const token = jwt.sign({ id: data._id }, "private-key");
          console.log(token);
          return res.status(200).cookie("token", token).redirect("/user/home");
        }
      });
    } else {
      return res.status(400).send({ message: "user not found" });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const homePage = (req, res) => {
  return res.render("home");
};

module.exports = { signupPage, signUp, loginPage, login, homePage };
