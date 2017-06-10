'use strict';

const router = require('express').Router()
  , ImagesController = require('../controllers/images.controller')
  , ImagesInstance = new ImagesController();

router.get('/:handle', ImagesInstance.getByHandle.bind(ImagesInstance));

module.exports = router;
