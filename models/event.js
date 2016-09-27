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
  date: String,
  startTime: String,
  endTime: String,
  url: String,
  host: String,
  contactNumber: String,
  lat: String,
  lng: String
});


module.exports = mongoose.model( 'Event', Event );
