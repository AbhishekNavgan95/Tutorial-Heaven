const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: Object,
      required: true,
    },
    video: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    tags: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["published", "archived"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Post", PostSchema);
