const express = require("express");
const router = express.Router();
require("dotenv").config();

/********************* import *****************************/

const {
  createPost,
  updatePost,
  updatePostStatus,
  deletePost,
  likePost,
  unlikePost,
  getAllPosts,
  getFullPostDetails,
  getCategoryAllPosts
} = require("../Controllers/Post.controller");
const { auth, isUser } = require("../Middlewares/Auth");

/********************* routes *****************************/

// craete post
router.post("/create-post", auth, isUser, createPost);

// update post
router.put("/update-post/:id", auth, isUser, updatePost);

// update post status
router.put("/update-poststatus/:id", auth, isUser, updatePostStatus);

// delete post
router.delete("/delete-post/:id", auth, isUser, deletePost);

// like post
router.put("/like-post/:id", auth, isUser, likePost);

// unlike post
router.put("/unlike-post/:id", auth, isUser, unlikePost);

// get full post details
router.get("/get-full-post-details/:postId", getFullPostDetails);

// get all posts for home page
// http://localhost:3000/api/v1/post/get-all-posts?page=1&limit=10
router.get("/get-all-posts", getAllPosts);

// get category vice all posts
// http://localhost:3000/api/v1/post//get-all-category-posts/665d6df7b081546e2338211c?page=1&limit=5
router.get("/get-all-category-posts/:categoryId", getCategoryAllPosts);

module.exports = router;
