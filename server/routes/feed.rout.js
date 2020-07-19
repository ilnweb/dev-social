const express = require('express');
const feedController = require('../controllers/feed.controler');

// const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

router.post('/post', isAuth, feedController.createPost);

router.post('/like', isAuth, feedController.addPostLike);
router.post('/unlike', isAuth, feedController.removePostLike);
router.post('/comment', isAuth, feedController.addPostComment);
router.post('/comment-reply', isAuth, feedController.addPostCommentReply);

router.post('/single-post', feedController.getSinglePost);


module.exports = router;