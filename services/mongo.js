'use strict';

const mongoose = require('mongoose')
    , path = require('path')
    , fs = require('fs')
    , appConfig = require('./../config')
    , normalizedPath = path.join(__dirname, './../models');

mongoose.Promise = global.Promise;

// Require and register all models
fs
  .readdirSync(normalizedPath)
  .forEach((file) => {
    require(path.join(__dirname, './../models', file));
  });

module.exports = new Promise((resolve, reject) => {
  try {
    mongoose.connect(appConfig.mongo.url);
    let db = mongoose.connection;
    db.on('error', (err) => {
      reject(err);
    });
    db.once('open', () => {
      resolve(db);
    });
  } catch (e) {
    reject(e);
  }
});
