'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Comment = new Schema({
  userId: String,
  userName: String,
  commentBody: String,
  created: Date
});

let Event = new Schema({
  title: { type: String, required: true },
  primCategory: { type: String, required: true },
  primSubCategory: String,
  secCategory: String,
  secSubCategory: String,
  locationName: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  description: String,
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: String,
  timeValue: Number,
  url: String,
  host: String,
  contactNumber: String,
  contactEmail: String,
  cwId: { type: String, required: true, unique: true, trim: true },
  lat: Number,
  lng: Number,
  creatorId: String,
  creatorEmail: String,
  comments: [Comment],
  active: Boolean
});


module.exports = mongoose.model( 'Event', Event );
