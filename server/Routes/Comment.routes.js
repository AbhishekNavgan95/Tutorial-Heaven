const express = require("express");
const router = express.Router();
require("dotenv").config();

/********************* import *****************************/

const {
  addComment,
  removeComment,
  likeComment,
  unlikeComment,
} = require("../Controllers/Comment.controller");
const { auth, isUser } = require("../Middlewares/Auth");

/********************* routes *****************************/

// add comment 
router.post("/add-comment", auth, isUser, addComment);

// remove comment
router.delete("/remove-comment", auth, isUser, removeComment);

// like comment
router.put("/like-comment/:commentId", auth, isUser, likeComment);

// unlike comment
router.put("/unlike-comment/:commentId", auth, isUser, unlikeComment);

module.exports = router;
