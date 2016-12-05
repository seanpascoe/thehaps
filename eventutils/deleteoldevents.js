'use strict'
var moment = require('moment');
var mongoose = require('mongoose');
var Event = require('../models/event');

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/thehaps';
mongoose.connect(mongoUri);

var endOfYesterday = moment().subtract(1, 'days').endOf('day').format("x");

//find old events
function getOldEvents() {
  return new Promise((resolve, reject) => {
    Event.find({timeValue: {$lte:endOfYesterday} }).remove().exec(function(err, numDocs) {
      if(err) {
        reject(err);
      }
      resolve(numDocs.result.n + ' events deleted');
    });
  });
}

getOldEvents().then(result => {
  console.log(endOfYesterday);
  console.log(result);
  mongoose.disconnect()
});
