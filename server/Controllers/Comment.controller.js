const Post = require("../Models/Post.model");
const User = require("../Models/User.model");
const Comment = require("../Models/Comment.model");

exports.addComment = async (req, res) => {
  try {
    const { description, postId } = req.body;
    const userId = req.user.id;

    // Validate received data
    if (!description || !postId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "You are not logged in, please log in",
      });
    }

    // Validate the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Validate the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Create the comment
    const newComment = await Comment.create({
      author: userId,
      description,
    });

    // Add the comment to the post's comments array
    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      data: newComment,
    });
  } catch (e) {
    console.error("Error occurred while adding the comment:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the comment.",
      error: e.message,
    });
  }
};

exports.removeComment = async (req, res) => {
    try {
      const { commentId, postId } = req.body;
      const userId = req.user.id;
  
      // Validate received data
      if (!commentId || !postId) {
        return res.status(400).json({
          success: false,
          message: "Comment ID and Post ID are required",
        });
      }
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "You are not logged in, please log in",
        });
      }
  
      // Find the comment
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found",
        });
      }
  
      // Check if the user is the author of the comment or an admin
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      if (comment.author.toString() !== userId && user.accountType !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this comment",
        });
      }
  
      // Remove the comment
      await Comment.findByIdAndDelete(commentId);
  
      // Remove the comment from the post's comments array
      await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } }, { new: true });
  
      return res.status(200).json({
        success: true,
        message: "Comment removed successfully",
      });
    } catch (e) {
      console.error("Error occurred while removing the comment:", e);
      return res.status(500).json({
        success: false,
        message: "An error occurred while removing the comment",
        error: e.message,
      });
    }
};

exports.likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Validate received data
    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "You are not logged in, please log in",
      });
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if the user has already liked the comment
    if (comment.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this comment",
      });
    }

    // Add user to the comment's likes array
    comment.likes.push(userId);
    await comment.save();

    // Add comment to the user's likedComments array
    await User.findByIdAndUpdate(userId, { $push: { likedComments: commentId } }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Comment liked successfully",
    });
  } catch (e) {
    console.error("Error occurred while liking the comment:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while liking the comment",
      error: e.message,
    });
  }
}

exports.unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Validate received data
    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "You are not logged in, please log in",
      });
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if the user has not liked the comment
    if (!comment.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this comment",
      });
    }

    // Remove user from the comment's likes array
    await Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId } }, { new: true });

    // Remove comment from the user's likedComments array
    await User.findByIdAndUpdate(userId, { $pull: { likedComments: commentId } }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Comment unliked successfully",
    });
  } catch (e) {
    console.error("Error occurred while unliking the comment:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while unliking the comment",
      error: e.message,
    });
  }
}