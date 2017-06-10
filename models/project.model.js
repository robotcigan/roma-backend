'use strict';

const mongoose = require('mongoose')
    , _ = require('lodash')
    , moment = require('moment');

const Project = new mongoose.Schema({
  title: {type: String, required: true, index: {unique: true}},
  description: {type: String, default: ''},
  handle: {type: String, required: true, index: {unique: true}},
  status: {type: String, default: ''},
  order: {type: Number, default: 0},
  active: {type: Boolean, default: false},
  created: {type: Date, default: moment()},
  updated: {type: Date, default: moment()},
  images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}]
});

Project.methods.clear = function(...fields) {
  let projectOut = this;
  if (this.toObject) {
    projectOut = this.toObject();
    delete projectOut['__v'];
    projectOut.id = projectOut['_id'].toString();
    delete projectOut['_id'];
    if (fields && fields.length) {
      _.each(fields, field => {
        delete projectOut[field];
      });
    }
  }
  return projectOut;
};

module.exports = mongoose.model('Project', Project);