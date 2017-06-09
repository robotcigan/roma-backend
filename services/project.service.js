'use strict';

const _ = require('lodash')
    , moment = require('moment')
    , mongoose = require('mongoose')
    , errors = require('./errors')
    , Project = require('../models/project.model');

module.exports = {
  getList: function() {
    return Project.find()
      .then(projects => {
        return projects;
      });
  },
  getById(id) {

  },
  create({title, description}) {
    // return Project.create({title, description, images: [{test: 'one'}, {test: 'two'}]});
    return Project.create({title, description});
  }
};
