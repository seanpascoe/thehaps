var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.post('/signup', function(req, res) {
  User.register(new User({email: req.body.email, username: req.body.username}), req.body.password, function(err, user) {
    if (err)
      return res.json(500, err);
    user.save( function(err, user) {
      res.json({ id: user._id, email: user.email, username: user.username });
    });
  });
});

router.post('/signin', function(req, res) {
  User.findOne({ email: req.body.email}, function(err, user) {
    if(err) {
      return res.json(500, 'There was a problem, please contact site admin');
    }
    if (user === null) {
      return res.json(500, 'User not found');
    }
    if (user) {
      user.authenticate(req.body.password, function(err, user, passwordErr) {
        if (passwordErr) {
          return res.json(500, passwordErr.message);
        }
        return res.json({ id: user._id, email: user.email, username: user.username });
      });
    }
  });
});


module.exports = router;
