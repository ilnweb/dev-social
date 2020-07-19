const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema({
  createdAt: { type: Date, required: true, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
  text: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replys: [
    {
      createdAt: { type: Date, required: true, default: Date.now },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      likesCount: {
        type: Number,
        default: 0,
      },
      text: String,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: true,
    },
    postImg: {
      type: String,
      required: true,
    },
    postBody: {
      type: String,
      required: true,
    },
    tags: [String],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    comments: [comment],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
