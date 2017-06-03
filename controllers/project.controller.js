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
        req.dataOut = projects;
        next();
      })
      .catch(rej => {
        console.log('res');
        console.log(rej);
        next(rej);
      });
  }
}

module.exports = ProjectController;