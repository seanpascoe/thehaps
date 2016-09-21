'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Event = new Schema({
  title: { type: String, required: true },
  category: { type: Array, required: true },
  locationName: String,
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  lat: String,
  lng: String,
  description: String,
  date: String,
  startTime: String,
  endTime: String,
  url: String,
});


module.exports = mongoose.model( 'Event', Event );
