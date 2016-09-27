'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Event = new Schema({
  title: { type: String, required: true },
  primaryCategory: { type: String, required: true },
  primarySubCategory: { type: String, required: true },
  secondaryCategory: String,
  secondarySubCategory: String,
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
