'use strict';

const _ = require('lodash')
    , moment = require('moment')
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
    return Project.create({title, description});
  }
};
