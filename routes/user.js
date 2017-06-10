/* eslint spaced-comment: 0 */
'use strict';

const router = require('express').Router()
    , UserController = require('../controllers/user.controller')
    , UserInstance = new UserController();

/***********************
 * URL: /api/v1/user
 ***********************/

/**
 * Login
 */
router.post('/', UserInstance.login.bind(UserInstance));

module.exports = router;
