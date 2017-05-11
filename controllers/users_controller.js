var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require("../config/passport");

router.get('/login', function(req, res){
    res.render('login', {
        title: 'Express Login'
    });
});

//this is the users_controller.js file
router.get('/signup-signin', function(req,res) {
	res.render('users/signup-signin', {
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
router.post('/create', function(req,res) {
	models.User.findAll({
    where: {email: req.body.email}
  }).then(function(users) {
			if (users.length > 0){
				console.log(users)
				res.send('we already have an email or username for this account')
			} else {
        db.User.create({
          email: req.body.email,
          password: req.body.password
        }).then(function() {
          res.redirect(307, "/");
        }).catch(function(err) {
          res.json(err);
        });
	    }
	})
});

module.exports = router;
