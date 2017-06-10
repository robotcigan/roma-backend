'use strict';

const basicAuth = require('basic-auth')
    , appConfig = require('../config')
    , errors = require('../services/errors');

module.exports = {
  admin: function(req, res, next) {
    console.log('middleware');
    let user = basicAuth(req);
    if (!user || user.name !== appConfig.user.username || user.pass !== appConfig.user.password) {
      return next(errors.api.access_denied);
    }
    next();
  }
};