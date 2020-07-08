const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
	}
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	bcrypt
		.hash(password, 12)
		.then((hashedPw) => {
			const user = new User({
				email: email,
				password: hashedPw,
				displayName: name
			});
			return user.save();
		})
		.then((user) => {
			res.status(200).json({
				user: {
					id: user._id.toString(),
					email: user.email,
					displayName: user.displayName,
          photoURL: user.photoURL,
          location: user.location,
          jobTitle:  user.jobTitle,
          workStatus:  user.workStatus,
          skills: user.skills
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				const error = new Error('A user with this email could not be found.');
				error.statusCode = 401;
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error('Wrong password!');
				error.statusCode = 401;
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString()
				},
				'somesupersecretsecret'
			);
			res.status(200).json({
				token: token,
				user: {
					id: loadedUser._id.toString(),
					email: loadedUser.email,
					displayName: loadedUser.displayName,
          photoURL: loadedUser.photoURL,
          location: loadedUser.location,
          jobTitle:  loadedUser.jobTitle,
          workStatus:  loadedUser.workStatus,
          skills: loadedUser.skills
				}
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.loginAuto = async (req, res, next) => { 
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        location: user.location,
        jobTitle:  user.jobTitle,
        workStatus:  user.workStatus,
        skills: user.skills
      }
    });
  } catch(err){
    console.log(err);
  }

}
