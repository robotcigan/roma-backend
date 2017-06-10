'use strict';

const router = require('express').Router()
    , imageMw = require('../middlewares/multer')
    , ProjectController = require('../controllers/project.controller')
    , ProjectInstance = new ProjectController();

/***********************
 * URL: /api/v1/project
 ***********************/

/**
 * Get list of projects
 */
router.get('/', ProjectInstance.getList.bind(ProjectInstance));
/**
 * Create new project
 */
router.post('/', ProjectInstance.create.bind(ProjectInstance));
/**
 * Add image to project by handle
 */
router.post('/:handle/image', imageMw.array(), ProjectInstance.addImage.bind(ProjectInstance));

module.exports = router;