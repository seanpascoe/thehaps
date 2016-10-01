'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/event');

// GET events within start and end date
router.get('/', (req, res) => {
  let startDate = parseInt(req.query.startDate);
  let endDate = parseInt(req.query.endDate);
  Event.find({timeValue: {$gte:startDate, $lte:endDate} },(err, events) => {
    res.json(events);
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
    contactNumber: req.body.contactNumber,
    lat: req.body.lat,
    lng: req.body.lng
  }).save((err, event) => {
    res.json(event);
  });
});


module.exports = router;
