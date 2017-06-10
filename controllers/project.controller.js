'use strict';

const fs = require('fs')
    , projectService = require('../services/project.service')
    , imageService = require('../services/image.service')
    , errors = require('../services/errors');

/**
 * Project middleware
 */
class ProjectController {

  /**
   * @constructor
   */
  constructor() {}

  /**
   * Get list of projects
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  getList(req, res, next) {
    projectService.getList()
      .then(projects => {
        req.dataOut = projects.clearByInstances();
        next();
      })
      .catch(rej => {
        console.log('res');
        console.log(rej);
        next(rej);
      });
  }

  create(req, res, next) {
    projectService.create(req.body)
      .then(project => {
        req.dataOut = project.clear();
        next();
      })
      .catch(rej => {
        // console.log('rej');
        // console.log(rej.toJSON());
        next(rej);
      });
  }

  /**
   * Add image to project by handle
   * @ApiParams {string} handle - project
   * @ApiBody {string} handle - image
   * @ApiBody {string?} title
   * @ApiBody {string?} description
   * @ApiBody {number?} order
   */
  addImage(req, res, next) {
    console.log(req.file);
    console.log(req.body);
    if (!req.file) {
      return next(errors.api.bad_params);
    }
    let data = {
      projectName: req.params.handle,
      handle: req.body.handle,
      title: req.body.title,
      description: req.body.description,
      order: req.body.order,
      timestamp: req.body.timestamp,
      originalName: req.file.originalname
    };
    projectService.addImageByHandle(req.params.handle, data)
      .then(project => {
        req.dataOut = project.clear();
        next();
      })
      .catch(rej => {
        console.log('rej');
        console.log(rej);
        imageService.removeByName(req.file.filename)
          .then(res => next(rej))
          .catch(next);
      });
  }
}

module.exports = ProjectController;