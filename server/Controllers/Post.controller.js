const Post = require("../Models/Post.model");
const User = require("../Models/User.model");
const Category = require("../Models/Category.model");
const { uploadImageTocloudinary } = require("../Utils/uploadToCloudinary");
const { deleteImageFromCloudinary } = require("../Utils/deleteFromCloudinary");
require("dotenv").config();
const Comment = require("../Models/Comment.model");
const mailSender = require("../Utils/mailSender");
const VideoRemovedEmailTamplate = require("../EmailTamplates/VideoRemovedEmailTamplate");

// Utility function to shuffle an array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// create post ✅
exports.createPost = async (req, res) => {
  try {
    // recieve data
    const { title, description, category, tags } = req.body;
    const thumbnail = req.files?.thumbnail;
    const video = req.files?.video;

    // validate data
    if (!title || !description || !tags || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // validate files
    if (!thumbnail || !video) {
      return res.status(400).json({
        success: false,
        message: "Video or Thumbnail is missing",
      });
    }

    // getting user by id
    const userId = req.user.id;
    const author = await User.findById(userId);

    // validating user
    if (!author) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // validate category
    const categoryExist = await Category.findById(category);
    if (!categoryExist) {
      return res.status(400).json({
        success: false,
        message: "Category does not exist, please choose a different category",
      });
    }

    // uploading thumbnail
    const uploadedThumbnail = await uploadImageTocloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    if (!uploadedThumbnail) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while uploading the thumbnail",
      });
    }

    // uploading video
    const uploadedVideo = await uploadImageTocloudinary(
      video,
      process.env.FOLDER_NAME
    );
    if (!uploadedVideo) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while uploading the video",
      });
    }

    // create new post
    const createdPost = await Post.create({
      thumbnail: uploadedThumbnail,
      video: uploadedVideo,
      title,
      description,
      tags,
      category: categoryExist?._id,
      author: author._id,
      status: process.env.POST_STATUS_PUBLISHED,
    });

    // add created post to user model
    updatedUser = await User.findByIdAndUpdate(
      author,
      {
        $push: {
          posts: createdPost,
        },
      },
      { new: true }
    );

    updatedUser.password = undefined;
    updatedUser.token = undefined;
    updatedUser.deletionScheduled = undefined;
    updatedUser.__v = undefined;

    // update category with new created post
    const updatedCategory = await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          posts: createdPost._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post Created Successfully",
      data: updatedUser,
    });
  } catch (e) {
    console.log("error occurred while creating the post : ", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the Post",
      error: e?.message,
    });
  }
};

// update post  ✅
exports.updatePost = async (req, res) => {
  try {
    // receive data
    const { title, description, category, tags } = req.body;

    const thumbnail = req?.files?.thumbnail;
    const postId = req.params?.id;

    // find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // validate user authorization
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    // validate category if provided
    if (category) {
      const categoryExist = await Category.findById(category);
      if (!categoryExist) {
        return res.status(400).json({
          success: false,
          message:
            "Category does not exist, please choose a different category",
        });
      }
    }

    // update thumbnail if provided
    let uploadedThumbnail;
    if (thumbnail) {
      // delete old thumbnail from Cloudinary
      await deleteImageFromCloudinary(post?.thumbnail);

      // upload new thumbnail to Cloudinary
      uploadedThumbnail = await uploadImageTocloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      if (!uploadedThumbnail) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong while uploading the thumbnail",
        });
      }
    }

    // update post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: title || post.title,
        description: description || post.description,
        tags: tags || post.tags,
        category: category || post.category,
        thumbnail: uploadedThumbnail || post.thumbnail,
      },
      { new: true }
    );

    const updatedUser = await User.findById(req.user.id);

    updatedUser.password = undefined;
    updatedUser.token = undefined;
    updatedUser.deletionScheduled = undefined;
    updatedUser.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    console.log("error occurred while updating the post: ", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the post",
      error: e?.message,
    });
  }
};

// update post status ✅
exports.updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate the status
    if (
      status === process.env.POST_STATUS_PUBLISHED ||
      status === process.env.POST_STATUS_ARCHIVED
    ) {
      // Find the post
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found.",
        });
      }

      // Check if the authenticated user is the author of the post
      if (post.author.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update the status of this post.",
        });
      }

      // Update the post status
      post.status = status;
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post status updated successfully.",
        data: post,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "invalid post status, try again",
      });
    }
  } catch (e) {
    console.error("Error occurred while updating post status:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the post status.",
      error: e.message,
    });
  }
};

// delete post ✅
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the post
    const post = await Post.findById(id).populate({
      path: "author",
      select: "firstName lastName email",
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Check if the authenticated user is the author of the post
    if (
      post.author._id.toString() !== req.user.id &&
      req.user.accountType !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post.",
      });
    }

    const authorEmail = post?.author?.email;
    const videoTitle = post.title;

    // Delete thumbnail and video from Cloudinary
    await deleteImageFromCloudinary(post.thumbnail);
    await deleteImageFromCloudinary(post.video);

    // Delete all comments related to this post
    await Comment.deleteMany({ _id: { $in: post.comments } });

    // delete post from user
    await User.findByIdAndUpdate(
      post.author,
      {
        $pull: {
          posts: post?._id,
        },
      },
      {
        new: true,
      }
    );

    // delete post from category
    await Category.findByIdAndUpdate(
      post?.category,
      {
        $pull: {
          posts: post?._id,
        },
      },
      { new: true }
    );

    // Delete the post from the database
    await Post.findByIdAndDelete(id);

    if (req.user.accountType === "admin") {
      const emailTamplate = VideoRemovedEmailTamplate(videoTitle);
      const mailResponse = await mailSender(authorEmail, "Your video has been removed", emailTamplate);
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (e) {
    console.error("Error occurred while deleting the post:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the post.",
      error: e.message,
    });
  }
};

// like post ✅
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this post.",
      });
    }

    // Add the user's ID to the likes array in Post and likedPosts array in User
    await Post.findByIdAndUpdate(
      id,
      { $push: { likes: userId } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { likedPosts: id } },
      { new: true }
    );

    updatedUser.password = undefined;
    updatedUser.token = undefined;
    updatedUser.deletionScheduled = undefined;
    updatedUser.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Post liked successfully.",
      data: updatedUser,
    });
  } catch (e) {
    console.error("Error occurred while liking the post:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while liking the post.",
      error: e.message,
    });
  }
};

// unlike post ✅
exports.unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this post.",
      });
    }

    // Remove the user's ID from the likes array in Post and likedPosts array in User
    await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedPosts: id } },
      { new: true }
    );

    updatedUser.password = undefined;
    updatedUser.token = undefined;
    updatedUser.deletionScheduled = undefined;
    updatedUser.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Post unliked successfully.",
      data: updatedUser,
    });
  } catch (e) {
    console.error("Error occurred while unliking the post:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while unliking the post.",
      error: e.message,
    });
  }
};

// get all posts ✅
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page or limit parameters." });
    }

    // Filter for published posts
    const filter = { status: "published" };

    // Count total number of published posts
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    if (page > totalPages) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found." });
    }

    // Fetch paginated published posts from the database
    const startIndex = (page - 1) * limit;
    const paginatedPosts = await Post.find(filter)
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "category author",
        select: "firstName lastName image",
      });

    const finalPosts = shuffleArray(paginatedPosts);

    res.status(200).json({
      success: true,
      message: "Fetched posts successfully",
      data: {
        totalPosts,
        totalPages,
        currentPage: page,
        posts: finalPosts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching posts",
      error: error.message,
    });
  }
};

// get full post details ✅
exports.getFullPostDetails = async (req, res) => {
  try {
    const postId = req.params?.postId;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post id is required",
      });
    }

    const postDetails = await Post.findById(postId)
      .populate({
        path: "author",
        select: "firstName lastName image email",
      })
      .populate({
        path: "category",
        select: "title description image",
      })
      .exec();

    if (!postDetails) {
      return res.status(400).json({
        success: false,
        message: "Post details not found",
      });
    }

    if (postDetails.status !== process.env.POST_STATUS_PUBLISHED) {
      return res.status(400).json({
        success: false,
        message: "Post details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched full post details successfully",
      data: postDetails,
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      message: "Something went wrong while fetching post details",
      error: e?.message,
    });
  }
};

// get category wise all posts ✅
exports.getCategoryAllPosts = async (req, res) => {
  try {
    const categoryId = req.params?.categoryId;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: "Invalid page or limit parameters.",
      });
    }

    const filter = { status: "published", category: categoryId };
    const skip = (page - 1) * limit;

    const postsCount = await Post.countDocuments(filter);

    if (postsCount <= 0) {
      return res.status(404).json({
        success: false,
        message: "No Videos found for this Category.",
      });
    }

    if (skip >= postsCount) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }

    const totalPages = Math.ceil(postsCount / limit);

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
        select: "firstName lastName image createdAt",
      });

    const shuffledPosts = shuffleArray(posts);

    return res.status(200).json({
      success: true,
      message: "Category posts fetched successfully.",
      data: {
        totalPosts: postsCount,
        totalPages,
        currentPage: page,
        posts: shuffledPosts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching category posts.",
      error: error.message,
    });
  }
};

// get all category posts ✅
exports.getCategoryPosts = async (req, res) => {
  try {
    const categoryId = req.params?.categoryId;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    const posts = await Post.find({ status: "published", category: categoryId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "firstName lastName image createdAt",
      });

    const shuffledPosts = shuffleArray(posts);

    return res.status(200).json({
      success: true,
      message: "Category posts fetched successfully.",
      data: shuffledPosts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching category posts.",
      error: error.message,
    });
  }
};
