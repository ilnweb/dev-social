const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		postTitle: {
			type: String,
			required: true
		},
		postImg: {
			type: String,
			required: true
		},
		postBody: {
			type: String,
			required: true
		},
		tags: [ String ],
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
    likes: {
      type: Number,
      default: 0
    },
		comments: [
			{
				text: String,
				postedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				}
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
