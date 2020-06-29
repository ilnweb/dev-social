const express = require('express');
const userController = require('../controllers/user.controler');
const multer = require('../middleware/multerCloudinary'); 

// const { body } = require('express-validator/check');

// const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.post('/avatar', userController.postAvatar);
router.post('/profile-info', userController.updateUserInfo);


module.exports = router;