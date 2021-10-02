const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  "local-login",
  new LocalStrategy(
    // Our user will sign in using a username
    {
      usernameField: "username",
    },
    (username, password, done) => {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          username: username,
        },
      }).then((dbUser) => {
        // If there's no user with the given username
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }
        // If there is a user with the given username, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    (req, username, password, done) => {
      // User.findOne wont fire unless data is sent back
      // we are checking to see if the user trying to login already exists
      db.User.findOne({
        where: {
          username: username,
        },
      }).then((err, user) => {
        // if there are any errors, return the error
        if (err) return done(err);

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, res.json({ duplicateUser: true }));
        } else {
          // save the user
          return db.User.create(req.body)
            .then(() => {
              return done(null, req.body);
            })
            .catch((err) => console.log(err));
        }
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
