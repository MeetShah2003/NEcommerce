const express = require("express");
const cookie = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { googleAuth } = require("./helper/google.auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use(session({ secret: "private-key" }));

googleAuth(passport);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use(userRoute);

app.listen(8090, () => {
  console.log("Server is running on port 8090");
  connection();
});
