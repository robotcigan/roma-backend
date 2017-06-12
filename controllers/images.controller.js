'use strict';

const dropboxService = require('../services/dropbox')
    , imageService = require('../services/image.service')
    , errors = require('../services/errors');

class ImagesController {
  constructor() {
  }

  getByHandle(req, res, next) {
    imageService.getByHandle(req.params.handle)
      .then(fileUrl => {
        res.sendFile(fileUrl);
      })
      .catch(rej => {
        console.log('rej');
        console.log(rej);
        next(rej);
      });
  }
}

module.exports = ImagesController;
