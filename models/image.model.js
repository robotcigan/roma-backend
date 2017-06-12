'use strict';

const mongoose = require('mongoose')
  , _ = require('lodash')
  , moment = require('moment');

const Image = new mongoose.Schema({
  projectId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Project'},
  handle: {type: String, required: true, index: {unique: true}},
  order: {type: Number, default: 0},
  originalName: {type: String, default: ''},
  fullName: {type: String, default: ''},
  projectHandle: {type: String, default: ''},
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  url: {type: String, default: ''},
  created: {type: Date, default: moment()},
  timestamp: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model('Image', Image);
