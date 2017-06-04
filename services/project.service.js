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
    return Project.create({title, description})
      .catch(rej => {
        console.log('rej');
        console.log(rej.toString());
        console.log(rej instanceof mongoose.Error);
        // throw errors.dbo.default.mongoErr(rej);
        throw rej.toString();
      });
  }
};
