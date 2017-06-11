/* eslint valid-jsdoc: 0 */
'use strict';

const fs = require('fs')
    , projectService = require('../services/project.service')
    , imageService = require('../services/image.service')
    , errors = require('../services/errors');

class ProjectController {
  constructor() {}

  /**
   * Get list of projects
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

  /**
   * Get project by handle
   * @param req
   * @param res
   * @param next
   */
  getByHandle(req, res, next) {
    projectService.getByHandle(req.params.handle)
      .then(project => {
        req.dataOut = project.clear();
        next();
      })
      .catch(rej => {
        console.log('rej');
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

  updateByHandle(req, res, next) {
    projectService.updateByHandle(req.params.handle, req.body)
      .then(project => {
        req.dataOut = project.clear();
        next();
      })
      .catch(rej => {
        console.log('rej');
        console.log(rej);
        next(rej);
      });
  }

  removeByHandle(req, res, next) {
    const withImages = req.query ? req.query.options.split(',').indexOf('with-images') !== -1 : false;
    projectService.removeByHandle(req.params.handle, withImages)
      .then(() => {
        req.dataOut = [];
        next();
      })
      .catch(rej => {
        console.log('rej');
        console.log(rej);
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
      originalName: req.file.originalname,
      fullName: req.file.filename
    };
    projectService.addImageByHandle(req.params.handle, data)
      .then(project => {
        req.dataOut = project.clear();
        next();
      })
      .catch(rej => {
        console.log('rej');
        console.log(rej);
        imageService.removeFileByName(req.file.filename)
          .then(res => next(rej))
          .catch(next);
      });
  }
}

module.exports = ProjectController;