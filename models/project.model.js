'use strict';

const mongoose = require('mongoose');

const Scheme = new mongoose.Schema({
  title: {type: String, index: {unique: true}},
  order: {type: Number, defaultValue: 0},
  created: Date
});

Scheme.methods.clear = function() {
  return mongoose.model('Team').clear(this);
};

Scheme.statics.clear = function(project) {
  let projectOut = null;
  if (project.toObject) {
    projectOut = project.toObject();
  }
  return projectOut;
};

module.exports = mongoose.model('Project', Scheme);