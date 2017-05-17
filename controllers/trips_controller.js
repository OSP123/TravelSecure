var db  = require('../models');
var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");


router.get('/', isAuthenticated, function(req, res) {
  res.render('trips/trips', {
  	layout: 'main-trips'
  });
});

module.exports = router;
