const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

const googleAuth = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:8090/auth/google/callback",
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser = ((user, done) => {
    console.log(user);
    return done(null, user);
  });

  passport.deserializeUser = ((profile, done) => {
    console.log(profile);
    return done(null, profile);
  });
};

module.exports = { googleAuth };



// const GoogleStrategy = require("passport-google-oauth20");
// require("dotenv").config();

// const googleAuth = (passport) => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "http://127.0.0.1:8090/auth/google/callback",
//       },
//       (accessToken, refreshToken, profile, cb) => {
//         console.log(profile);
//         return cb(null, profile);
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     console.log(user);
//     return done(null, user);
//   });

//   passport.deserializeUser((profile, done) => {
//     console.log(profile);
//     return done(null, profile);
//   });
// };

// module.exports = { googleAuth };
