'use strict';

const router = require('express').Router()
  , ImagesController = require('../controllers/images.controller')
  , ImagesInstance = new ImagesController()
  , multer = require('multer')
  , storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      // cb(null, file.fieldname + '-' + Date.now());
      cb(null, file.filename);
    }
  })
  , upload = multer({storage});

router.post('/', upload.single('img'), ImagesInstance.addImage.bind(ImagesInstance));

module.exports = router;
