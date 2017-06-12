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
  /**
   * Update project by handle
   * @param {string} handle
   * @param {object} data
   * @return {Promise<projectModel>} project
   */
  updateByHandle(handle, data) {
    data.updated = moment();
    return Project.findOneAndUpdate({handle}, data, {new: true})
      .then(project => {
        if (!project) {
          throw errors.project.not_found.withVar('\"' + handle + '\"');
        }
        return project;
      });
  },
  removeByHandle(handle, withImages) {
    return Project.remove({handle})
      .then(command => {
        let result = {
          project: 0,
          image: 0
        };
        if (command.result.n === 0) {
          throw errors.project.not_found.withVar('\"' + handle + '\"');
        }
        result.project = command.result.n;
        if (withImages) {
          return imageService.removeByProjectHandle(handle)
            .then(command => {
              result.image = command.result.n;
              return result;
            });
        }
        return result;
      });
  },
  /**
   * Add image to project by handle
   * @param {string} handle
   * @param {object} imageData
   * @return {Promise<projectModel>} project
   */
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
  /**
   * Add images to project by handle
   * @param {string} handle
   * @param {array} imagesData
   * @return {Promise<projectModel>} project
   */
  addImagesByHandle(handle, imagesData) {
    return this.getByHandle(handle)
      .then(project => {
        return imageService.createMany(imagesData)
          .then(_images => {
            _.each(_images, item => {
              project.images.push(item);
            });
            project.updated = moment();
            return project.save();
          });
      });
  },
  removeImageByHandle(handle, imageId) {
    return Project.findOneAndUpdate({handle}, {
      $pull: {
        images: mongoose.Types.ObjectId(imageId)
      }
    }, {new: true})
      .then(project => {
        if (!project) {
          throw errors.project.not_found.withVar('\"' + handle + '\"');
        }
        return imageService.removeById(imageId)
          .then(command => {
            if (command.result.n === 0) {
              throw errors.image.not_found.withVar('\"' + imageId + '\"');
            }
            return project;
          });
      });
  }
};
