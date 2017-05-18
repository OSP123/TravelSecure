var db       = require('../models');
var express  = require('express');
var router   = express.Router();
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

//this is the users_controller.js file
router.get('/signup', function(req,res) {
	res.render('users/registration', {
    layout: 'main-registration'
  });
});

router.get('/sign-out', function(req,res) {
  req.logout();
  res.redirect("/");
});


// login
router.post('/login', passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
  res.json("/");
});


// register a user
router.post('/signup', function(req,res) {
	db.User.findAll({
    where: {username: req.body.username}
  }).then(function(users) {
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
      }).then(function() {
        res.send({redirect: '/'});
      }).catch(function(err) {
        res.json(err);
      });
    }
	})
});

module.exports = router;
