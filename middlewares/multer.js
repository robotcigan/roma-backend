'use strict';

const multer = require('multer')
    , {destination, filename} = require('../services/multer.service')
    , storage = multer.diskStorage({
      destination, filename
    })
    , upload = multer({storage});


module.exports = {
  array: function() {
    return upload.array('img');
  },
  single: function() {
  }
};