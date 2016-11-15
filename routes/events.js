'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/event');

// mongoose.set('debug', true);

// GET events within start and end date
router.get('/', (req, res) => {
  let startDate = parseInt(req.query.startDate);
  let endDate = parseInt(req.query.endDate);
  let minLat = parseFloat(req.query.minLat);
  let maxLat = parseFloat(req.query.maxLat);
  let minLng = parseFloat(req.query.minLng);
  let maxLng = parseFloat(req.query.maxLng);

  Event.find(
    {
      timeValue: {$gte:startDate, $lte:endDate},
      lat: {$gte:minLat, $lte:maxLat},
      lng: {$gte:minLng, $lte:maxLng},
      active: true
    },
    { description: false, comments: false },

    (err, events) => {
      res.json(events);
    }
  );
});

router.get('/details', (req, res) => {
  Event.findOne({_id: req.query.id}, (err, event) => {
    res.json(event);
  });
});

// POST creates a event
router.post('/', (req, res) => {
  new Event({
    title: req.body.title,
    primCategory: req.body.primCategory,
    primSubCategory: req.body.primSubCategory,
    secCategory: req.body.secCategory,
    secSubCategory: req.body.secSubCategory,
    locationName: req.body.locationName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    description: req.body.description,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    timeValue: req.body.timeValue,
    url: req.body.url,
    host: req.body.host,
    contactEmail: req.body.contactEmail,
    contactNumber: req.body.contactNumber,
    lat: req.body.lat,
    lng: req.body.lng,
    creatorId: req.body.creatorId,
    creatorEmail: req.body.creatorEmail,
    active: false
  }).save((err, event) => {
    if (err) {
      console.log('this err', err);
      res.json(err);
    }
    res.json(event);
  });
});


module.exports = router;
