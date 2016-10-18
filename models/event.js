'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Event = new Schema({
  title: { type: String, required: true },
  primCategory: { type: String, required: true },
  primSubCategory: { type: String, required: true },
  secCategory: String,
  secSubCategory: String,
  locationName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  description: String,
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: String,
  timeValue: Number,
  url: String,
  host: String,
  contactEmail: String,
  contactNumber: String,
  lat: String,
  lng: String,
  creatorId: String,
  creatorEmail: String,
  active: Boolean
});


module.exports = mongoose.model( 'Event', Event );
