'use strict';

const router = require('express').Router()
    , ProjectController = require('../controllers/project.controller')
    , ProjectInstance = new ProjectController();

router.get('/', ProjectInstance.getList.bind(ProjectInstance));

module.exports = router;