'use strict';

const projectService = require('../services/project.service');

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

  addImage(req, res, next) {
    console.log(req.files);
    console.log(req.body);
    console.log(typeof req.body);
    try {
      console.log(JSON.parse(req.body['0']));
    } catch (e) {
      console.log(e);
    }
    req.dataOut = [];
    next();
  }
}

module.exports = ProjectController;