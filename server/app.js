const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const feedRoutes = require('./routes/feed.rout');
const authRoutes = require('./routes/auth.rout');
const userRouts = require('./routes/user.rout');
const cloudinary = require('cloudinary').v2;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});




const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '50mb', extended: true })); // application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cors());


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRouts);

mongoose.connect(process.env.MONGO_DB_API_KEY, { useUnifiedTopology: true, useNewUrlParser: true });

app.listen(port, (err) => {
	if (err) throw err;
	console.log('Server running on port' + port);
});




// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, 'client/build')));

// 	app.get('*', function(req, res) {
// 		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// 	});
// }


// const storage = new CloudinaryStorage({
// 	cloudinary: cloudinary,
// 	folder: 'dev-social',
// 	allowedFormats: [ 'jpg', 'png','jpeg' ],
// 	transformation: [ { width: 500, height: 500, crop: 'limit' } ],
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     callback(undefined, name);
//   }
// });