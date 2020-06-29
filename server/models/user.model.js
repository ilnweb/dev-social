const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	displayName: {
		type: String,
		required: true
	},
	photoURL: {
		type: String,
		default: ''
	},
	location: {
		type: String,
		default: ''
	},
	jobTitle: String,
	workStatus: String,
	skills: [ String ],
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	]
});

module.exports = mongoose.model('User', userSchema);
