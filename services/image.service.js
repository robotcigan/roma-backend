'use strict';

const fs = require('fs')
    , path = require('path');

module.exports = {
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
