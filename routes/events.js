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
  new Event({
    title: req.body.title,
    category: req.body.category,
    locationName: req.body.locationName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    lat: req.body.lat,
    lng: req.body.lng
  }).save((err, event) => {
    res.json(event);
  });
});


module.exports = router;
