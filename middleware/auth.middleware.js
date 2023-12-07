const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  let { token } = req.cookies;
  if (token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode) {
      req.user = decode;
      next();
    } else {
      return res.status(400).send({ message: "invalid token recieved" });
    }
  } else {
    return res.status(404).redirect("/user/login");
  }
};

const isAdmin = (req, res, next) => {
  let { token } = req.cookies;
  if (token) {
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode.role == "admin") {
      req.user=decode;
      next();
    } else {
      return res
        .status(400)
        .send({ message: "you cannot have right to access this page" });
    }
  } else {
    return res.status(400).redirect("/user/login");
  }
};

module.exports = { verifyToken, isAdmin };
