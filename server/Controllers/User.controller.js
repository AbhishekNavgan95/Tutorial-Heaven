const User = require("../Models/User.model");
const Post = require("../Models/Post.model");
const { deleteImageFromCloudinary } = require("../Utils/deleteFromCloudinary");
const { uploadImageTocloudinary } = require("../Utils/uploadToCloudinary");

// update profile picture ✅
exports.updateProfilePicture = async (req, res) => {
  console.log("here ");
  try {
    const userId = req.user.id;
    const newPfp = req.files?.image;

    if (!newPfp) {
      return res.status(400).json({
        success: false,
        message: "new profile picture not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await deleteImageFromCloudinary(user.image);

    const uploadedImage = await uploadImageTocloudinary(
      newPfp,
      process.env.FOLDER_NAME
    );

    user.image = uploadedImage;
    await user.save();

    console.log("uploaded image : ", uploadedImage);

    if (!uploadedImage) {
      return res.status(400).json({
        success: false,
        message: "something went wrong while uploading the new profile picture",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile picture updated Successfully",
      data: user
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the profile picture",
    });
  }
};

// update userName ✅
exports.updateUserName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const userId = req.user.id;

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;

    const newUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Username updated successfully",
      data: newUser,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the username",
    });
  }
};

// save post ✅
exports.savePost = async (req, res) => {
  try {
    const postId = req.params?.postId;
    const userId = req.user.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post id is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          savedPosts: post,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post saved successfully",
      data: updatedUser,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while saving the post",
    });
  }
};

// unsave post ✅
exports.unSavePost = async (req, res) => {
  try {
    const postId = req.params?.postId;
    const userId = req.user.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post id is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          savedPosts: postId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post unSaved successfully",
      data: updatedUser,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while saving the post",
    });
  }
};

// get all user posts ✅
exports.getAllUserPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "posts",
      options: {
        sort: { createdAt: -1 }, // Sort by creation date, newest first
        skip: (page - 1) * limit, // Skip records for pagination
        limit: limit, // Limit number of records per page
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Count the total number of posts for the user
    const userObject = await User.findById(userId);
    const totalPosts = userObject?.posts?.length;
    const totalPages = Math.ceil(totalPosts / limit);

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: {
        posts: user.posts,
        currentPage: page,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the user posts",
    });
  }
};
