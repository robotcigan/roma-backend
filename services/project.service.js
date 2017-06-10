'use strict';

const _ = require('lodash')
    , moment = require('moment')
    , mongoose = require('mongoose')
    , errors = require('./errors')
    , Project = require('../models/project.model')
    , imageService = require('../services/image.service');

module.exports = {
  getList: function() {
    return Project.find()
      .populate('images')
      .exec()
      .then(projects => {
        return projects;
      });
  },
  getById(id) {
  },
  getByHandle(handle) {
    return Project.findOne({handle})
      .populate('images')
      .exec()
      .then(project => {
        if (!project) {
          throw errors.project.not_found.withVar('\"' + handle + '\"');
        }
        return project;
      });
  },
  create({title, description, handle}) {
    return Project.create({title, description, handle});
  },
  addImageByHandle(handle, imageData) {
    return this.getByHandle(handle)
      .then(project => {
        return imageService.create(imageData)
          .then(image => {
            project.images.push(image);
            project.updated = moment();
            return project.save();
          });
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
