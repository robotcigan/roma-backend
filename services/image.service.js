'use strict';

const fs = require('fs')
    , path = require('path')
    , Image = require('../models/image.model');

module.exports = {
  create(imageData) {
    return Image.create(imageData);
  },
  removeByName(fileName) {
    let uploadsPath = path.resolve(__dirname, '..', 'uploads');
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(uploadsPath, fileName), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      resolve(uploadsPath);
    });
  }
};
