const express = require('express');
const feedController = require('../controllers/feed.controler');

// const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

router.post('/post', isAuth, feedController.createPost);

router.post('/single-post', feedController.getSinglePost);


module.exports = router;