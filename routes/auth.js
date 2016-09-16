var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.post('/signup', function(req, res) {
  User.register(new User({username: req.body.email}), req.body.password, function(err, user) {
    if (err)
      return res.json(500, err.message);

    user.save( function(err, user) {
      res.json({ id: user.id });
    });
  });
});

router.post('/signin', function(req, res) {
  User.findOne({ username: req.body.email}, function(err, user) {
    user.authenticate(req.body.password, function(err, user, passwordErr) {
      if (err)
        return res.json(500, 'User not found');
      if (passwordErr)
        return res.json(500, passwordErr.message);

      return res.json({ id: user.id });
    });
  });
});


module.exports = router;
