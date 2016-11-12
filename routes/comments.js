'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/event');


// POST finds event and adds comment to event
router.post('/', (req, res) => {
  Event.findById(req.body.eventId, (err, event) => {
    event.comments.push({
      userId: req.body.userId,
      userName: req.body.userName,
      commentBody: req.body.commentBody,
      created: Date.now()
    });
    event.save((err, event) => {
      if(err)
        console.log(err);
      res.json(event.comments)
    });
  });
});


module.exports = router;
