'use strict';

const mongoose = require('mongoose')
    , _ = require('lodash');

const Scheme = new mongoose.Schema({
  title: {type: String, index: {unique: true}},
  order: {type: Number, defaultValue: 0},
  created: Date
});

Scheme.methods.clear = function(...fields) {
  let projectOut = this;
  if (this.toObject) {
    projectOut = this.toObject();
    if (fields && fields.length) {
      _.each(fields, field => {
        delete projectOut[field];
      });
    }
  }
  return projectOut;
};

module.exports = mongoose.model('Project', Scheme);