'use strict'
var mongoose = require('mongoose');
var Event = require('../models/event');

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/thehaps';
mongoose.connect(mongoUri);

// find event documents with matching title and timevalue's
function getDups() {
  return new Promise((resolve, reject) => {
    Event.aggregate([
        { $group: {
            // Group by fields to match on (a,b)
            _id: { title: "$title", timeValue: "$timeValue" },

            // Count number of matching docs for the group
            count: { $sum:  1 },

            // Save the _id for matching docs
            docs: { $push: "$_id" }
        }},

        // Limit results to duplicates (more than 1 match)
        { $match: {
            count: { $gt : 1 }
        }}
    ], function (err, result) {
        if (err) {
          console.log(err);
          reject(err)
        }
        resolve(result)
    });
  });
}

//gets id's for each document with duplicate lat and lng
function deleteDups(arr) {
  if(arr.length === 0) {
    console.log('No duplicates!');
    mongoose.disconnect();
    return;
  }

  let dupArr = [].concat(...arr.map(group => {
    return group.docs.slice(1);
  }));

  console.log(dupArr.length + ' duplicates found');

  let results = dupArr.map(id => {
    return new Promise((resolve, reject) => {
      return Event.findByIdAndRemove(id, (err, doc) => {
        if(err) {
          reject(err);
        }
        resolve(doc._id + ' was removed!');
      });
    });
  });

  Promise.all(results).then(results => {
    console.log(results);
    mongoose.disconnect();
  }).catch(err => {
    console.log(err);
    mongoose.disconnect();
  });
}




getDups().then(data => {
  // console.log(data);
  deleteDups(data);
});
