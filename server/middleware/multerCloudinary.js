// const cloudinary = require('cloudinary').v2;
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// cloudinary.config({
// 	cloud_name: process.env.CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_KEY_SECRET
// });

// console.log('in middleware');

// const storage = new CloudinaryStorage({
// 	cloudinary: cloudinary,
// 	folder: 'dev-social',
// 	allowedFormats: [ 'jpg', 'png','jpeg' ],
// 	transformation: [ { width: 150, height: 1500, crop: 'limit' } ],
//   // filename: (req, file, callback) => {
//   //   const name = req.body.image.originalname.split(' ').join('_');
//   //   callback(undefined, name);
//   //   console.log(file);
//   // }
// });

// module.exports = multer({ storage: storage }).single('image');