const db = require('../models');

//this is the users_controller.js file
exports.registrationPage = (req,res) => {
  res.render('users/registration', {
    layout: 'main-registration'
  });
};

exports.signOutUser = (req,res) => {
  req.logout();
  res.redirect("/");
};

// login
exports.loginUser = (req, res) => {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
  res.json("/");
};

// register a user
exports.signUpUser = (req,res) => {

  db.User.findAll({
    where: {username: req.body.username}
  }).then(user => {
    if (users.length > 0) {
      res.json({
        duplicateUser: true
      });
    //At some point, make sure that only one user can be associated with an email.
    } else {
      db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(() => res.send({redirect: '/'})
      .catch(err => res.json(err))
      )
    }
  })
};

