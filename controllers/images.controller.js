'use strict';

const dropboxService = require('../services/dropbox')
    , errors = require('../services/errors');

class ImagesControler {
  constructor() {
  }

  addImage(req, res, next) {
    // console.log(Object.keys(req.body));
    console.log(req.file);
    console.log(req.body);
    req.dataOut = [];
    next();
    // dropboxService.addImage();
  }
}

module.exports = ImagesControler;
