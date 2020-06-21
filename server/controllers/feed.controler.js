const Post = require('../models/post.model');
const User = require('../models/user.model');
const cloudinary = require('cloudinary').v2;


exports.getPosts = (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = 2;
	let totalItems;
	Post.find()
		.countDocuments()
		.then((count) => {
			totalItems = count;
			return Post.find().skip((currentPage - 1) * perPage).limit(perPage);
		})
		.then((posts) => {
			res.status(200).json({
				message: 'Fetched posts successfully.',
				posts: posts,
				totalItems: totalItems
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
    const uploadedImage = await cloudinary.uploader.upload(
      postImg,
      {
        resource_type: 'image',
        public_id: `dev-social-post/${userId+postTitle}`,
        overwrite: false,
        notification_url: 'https://mysite.example.com/notify_endpoint'
      }
    )
    console.log(uploadedImage.url);
    const user = await User.findById(userId);
    const post = new Post({
      postTitle,
      postBody,
      tags,
      postImg:uploadedImage.url,
      postedBy: user._id
    });
    await post.save();
    await user.posts.push(post);
    await user.save();
    res.status(201).json({
      message: 'Post created successfully!'
    });
  } catch(err){
    console.log(err);
  }
};
