var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/event');

// GET shows all events
router.get('/', (req, res) => {
  Event.find((err, events) => {
    res.json(events);
  });
});

// POST creates a event
router.post('/', (req, res) => {
  console.log(req);
  new Event({
    title: req.body.title,
    category: req.body.category,
    locationName: req.body.locationName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    description: req.body.description,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    url: req.body.url,
    lat: req.body.lat,
    lng: req.body.lng
  }).save((err, event) => {
    res.json(event);
  });
});


module.exports = router;
