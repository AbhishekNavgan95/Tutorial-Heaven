const express = require("express");
const router = express.Router();

/********************* import *****************************/

const {
  sendOTP,
  signUp,
  login,
  scheduleAccountDeletion,
  cancelScheduledDeletion,
  updatePassword,
  createAdminAccount,
} = require("../Controllers/Auth.controller");

const {
  resetPasswordToken,
  resetPassword,
} = require("../Controllers/ResetPassword.controller");

const {
  updateProfilePicture,
  updateUserName,
  savePost,
  unSavePost,
  getAllUserPosts,
  getUserSavedPosts,
  refreshToken,
  suspendAccount,
  getAllAccounts
} = require("../Controllers/User.controller");

const { auth, isAdmin, isUser } = require("../Middlewares/Auth");

/********************* routes *****************************/

// refresh token
router.post("/refresh", refreshToken);

// send otp
router.post("/send-otp", sendOTP);

// sign up
router.post("/signup", signUp);

// login
router.post("/login", login);

// update profile picture
router.put("/update-pfp", auth, updateProfilePicture);

// update user name
router.put("/update-username", auth, updateUserName);

// save post to saved posts
router.put("/save-post/:postId", auth, isUser, savePost);

// unsave post from saved posts
router.put("/unsave-post/:postId", auth, isUser, unSavePost);

// get all user posts
// http://localhost:3000/api/v1/auth/user-posts?page=2&limit=2
router.get("/user-posts", auth, isUser, getAllUserPosts);

router.get("/saved-posts", auth, isUser, getUserSavedPosts);

router.get("/getAccounts", auth, isAdmin, getAllAccounts);

// generate reset password token
router.post("/reset-password-token", resetPasswordToken);

// reset password
router.put("/reset-password/:token", resetPassword);

// updatePassword
router.put("/update-password", auth, updatePassword);

// create Admin account
router.post("/signup-admin", createAdminAccount);

// suspend Account 
router.post("/suspend-account/:id", auth, isAdmin, suspendAccount);

// schedule account deletion 
router.put("/delete-account", auth, scheduleAccountDeletion);

// cancel account deletion
router.put("/cancel-delete-account/:userId", auth, isAdmin, cancelScheduledDeletion);

module.exports = router;
