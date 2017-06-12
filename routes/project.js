'use strict';

const router = require('express').Router()
    , imageMw = require('../middlewares/multer')
    , authMw = require('../middlewares/auth')
    , ProjectController = require('../controllers/project.controller')
    , ProjectInstance = new ProjectController();

/***********************
 * URL: /api/v1/project
 ***********************/

 // Get list of projects
router.get('/', ProjectInstance.getList.bind(ProjectInstance));
// Create new project
router.post('/', ProjectInstance.create.bind(ProjectInstance));
// Remove project by handle with images (optional)
router.delete('/:handle', ProjectInstance.removeByHandle.bind(ProjectInstance));
// Get project by handle
router.get('/:handle', ProjectInstance.getByHandle.bind(ProjectInstance));
// Update project main info by handle
router.put('/:handle', authMw.admin, ProjectInstance.updateByHandle.bind(ProjectInstance));
// Add images to project by handle
router.post('/:handle/image', authMw.admin, imageMw.single(), ProjectInstance.addImage.bind(ProjectInstance));
// Remove image by imageId in project by handle
router.delete('/:handle/image/:imageId', authMw.admin, ProjectInstance.removeImageById.bind(ProjectInstance));
// Add image to project by handle
router.post('/:handle/images', authMw.admin, imageMw.array(), ProjectInstance.addImages.bind(ProjectInstance));

module.exports = router;