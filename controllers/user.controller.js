/* eslint valid-jsdoc: 0 */
'use strict';

const errors = require('../services/errors')
    , appConfig = require('../config');

class User {
  constructor() {}

  /**
   * Login
   * @ApiBody {string} username
   * @ApiBody {string} password
   */
  login(req, res, next) {
    if (req.body.username !== appConfig.user.username || req.body.password !== appConfig.user.password) {
      return next(errors.api.access_denied);
    }
    let base64auth = 'Basic ' + new Buffer(`${req.body.username}-${req.body.password}`).toString('base64');
    req.dataOut = {
      base64auth
    };
    next();
  }
}

module.exports = User;
