const express = require('express');
const userController = require('../controllers/user.controler');
const isAuth = require('../middleware/is-auth'); 

// const { body } = require('express-validator/check');

// const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.post('/avatar', isAuth, userController.postAvatar);
router.post('/profile-info', isAuth, userController.updateUserInfo);


module.exports = router;