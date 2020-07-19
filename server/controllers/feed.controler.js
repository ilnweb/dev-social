const Post = require("../models/post.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;
// .countDocuments()
// .then((count) => {
// 	totalItems = count;
// 	return Post.find().skip((currentPage - 1) * perPage).limit(perPage);
// })

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;
  Post.find()
    .populate({
      path: "postedBy",
      select: "displayName photoURL",
    })
    .populate({
      path: "comments.postedBy",
      select: "displayName photoURL",
    }).populate({
      path: "comments.replys",
      populate: {
        path:"postedBy",
        select: "displayName photoURL"
      }
    })
    .exec()
    .then((posts) => {
      res.status(200).json({
        message: "Fetched posts successfully.",
        posts: posts,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = async (req, res, next) => {
  const userId = req.body.userId;
  const tags = req.body.tags;
  const postBody = req.body.postBody;
  const postTitle = req.body.postTitle;
  const postImg = req.body.postImg;
  // console.log(req.body);
  try {
    const uploadedImage = await cloudinary.uploader.upload(postImg, {
      resource_type: "image",
      public_id: `dev-social-post/${userId + postTitle}`,
      overwrite: false,
      notification_url: "https://mysite.example.com/notify_endpoint",
    });
    const user = await User.findById(userId);
    const post = new Post({
      postTitle,
      postBody,
      tags,
      postImg: uploadedImage.url,
      postedBy: user._id,
    });
    await post.save();
    await user.posts.push(post);
    await user.save();
    res.status(201).json({
      message: "Post created successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getSinglePost = async (req, res, next) => {
  console.log(req.body.postId);
  const postId = req.body.postId;
  const post = await Post.findById(postId)
    .populate({
      path: "postedBy",
      select: "displayName photoURL",
    })
    .populate({
      path: "comments.postedBy",
      select: "displayName photoURL",
    }).populate({
      path: "comments.replys",
      populate: {
        path:"postedBy",
        select: "displayName photoURL"
      }
    })
    .exec();
  res.status(200).json({
    post: post,
  });
};

exports.addPostLike = async (req, res, next) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const post = await Post.findById(postId);
  post.likesCount += 1;
  post.likes.push(userId);
  await post.save();
  res.status(200).json({
    message: "post like added",
  });
};

exports.removePostLike = async (req, res, next) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const post = await Post.findById(postId);
  post.likesCount -= 1;
  post.likes.pull(userId);
  await post.save();
  res.status(200).json({
    message: "post like removed",
  });
};

exports.addPostComment = async (req, res, next) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const comment = req.body.comment;
  const post = await Post.findById(postId);
  post.comments.push({
    text: comment,
    postedBy: userId,
  });
  post.commentsCount += 1;
  await post.save();
  res.status(200).json({
    message: "post comment added",
  });
};

exports.addPostCommentReply = async (req, res, next) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const commentId = req.body.userId;
  const reply = req.body.reply;
  const post = await Post.findById(postId);
  const commentToAddReply = post.comments.find(
    (comment) => comment._id === commentId
  );
  const index = post.comments.indexOf(commentId);
  commentToAddReply.replys.push({
    text: reply,
    postedBy: userId,
  });
  post.comments[index] = commentToAddReply;
  post.commentsCount += 1;
  await post.save();
  res.status(200).json({
    message: "post comment added",
  });
};
