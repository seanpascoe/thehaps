'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let User = new Schema({
  email: { type : String, unique : true, required : true, trim: true },
  username: { type : String, unique : true, required : true, trim: true },
  password: { type : String }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'User', User );
