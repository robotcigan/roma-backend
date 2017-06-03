'use strict';

const mongoose = require('mongoose')
    , _ = require('lodash')
    , moment = require('moment');

const Scheme = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {type: String, required: true, index: {unique: true}},
  description: {type: String, default: ''},
  status: {type: String, default: ''},
  order: {type: Number, default: 0},
  active: {type: Boolean, default: false},
  created: {type: Date, default: moment()}
});

Scheme.methods.clear = function(...fields) {
  let projectOut = this;
  if (this.toObject) {
    projectOut = this.toObject();
    delete projectOut['__v'];
    if (fields && fields.length) {
      _.each(fields, field => {
        delete projectOut[field];
      });
    }
  }
  return projectOut;
};

module.exports = mongoose.model('Project', Scheme);