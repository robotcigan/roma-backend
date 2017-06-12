'use strict';

const fs = require('fs')
    , path = require('path')
    , errors = require('./errors')
    , Image = require('../models/image.model');

module.exports = {
  uploadPath: path.resolve(__dirname, '..', 'uploads'),
  getByHandle(handle) {
    return Image.findOne({handle})
      .then(image => {
        if (!image) {
          throw errors.api.bad_params;
        }
        // return this.getByUrl(image.url || `${image.projectName}-${image.timestamp}-${originalName}`)
        return (image.url || path.join(this.uploadPath, `${image.projectName}-${image.timestamp}-${image.originalName}`));
      });
  },
  getByUrl(url) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(this.uploadPath, url), 'utf-8', (err, file) => {
        if (err) {
          return reject(err);
        }
        if (!file) {
          return reject();
        }
        resolve(file);
      });
    });
  },
  create(imageData) {
    return Image.create(imageData);
  },
  createMany(imagesData) {
    return Image.insertMany(imagesData);
  },
  removeFileByName(fileName) {
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
  },
  removeByProjectHandle(projectName) {
    return Image.find({projectName})
      .then(images => {
        images.forEach(image => {
          this.removeFileByName(image.fullName);
        });
        return Image.remove({projectName});
      });
  }
};
