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
  getByHandle(handle) {
    return Project.findOne({handle});
  },
  create({title, description, handle}) {
    return Project.create({title, description, handle});
  },
  addImageByHandle(handle, imageData) {
    return this.getByHandle(handle)
      .then(project => {
        imageData['_id'] = mongoose.Types.ObjectId();
        project.images.push(imageData);
        project.updated = moment();
        return project.save();
      });
  },
  addImagesByHandle(handle, imagesData = []) {
    return this.getByHandle(handle)
      .then(project => {
        _.each(imagesData, item => {
          project.images.push(item);
        });
        project.updated = moment();
        return project.save();
      });
  }
};
