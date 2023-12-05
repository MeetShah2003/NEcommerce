const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
});

const userModel = new mongoose.model("EcomUser", userSchema);

module.exports = { userModel };
