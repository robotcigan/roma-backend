'use strict';

const mongoose = require('mongoose')
  , _ = require('lodash')
  , moment = require('moment');

const Image = new mongoose.Schema({
  projectId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Project'},
  handle: {type: String, required: true, index: {unique: true}},
  order: {type: Number, default: 0},
  name: {type: String, default: ''},
  created: {type: Date, default: moment()},
  timestamp: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model('Image', Image);
