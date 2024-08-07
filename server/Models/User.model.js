const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: Object,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    accountSuspended: {
      type: Boolean,
      default: false
    },
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
    likedComments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    viewedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
    token: {
      type: String,
    },
    deletionScheduled: {
      type: Boolean, 
      default: false
    },
    deletionDate: {
      type: Date
    },
  },
  { timestamps: true }
);

// Method to clear the token after one hour
UserSchema.methods.clearTokenAfterOneHour = function () {
  const user = this;
  setTimeout(() => {
    user.token = undefined;
    user.save();
  }, 3600000); // 1 hour in milliseconds
};

module.exports = mongoose.model("User", UserSchema);
