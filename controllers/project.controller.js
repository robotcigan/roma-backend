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
}

module.exports = ProjectController;