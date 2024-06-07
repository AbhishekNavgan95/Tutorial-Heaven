const cron = require("node-cron");
const User = require("../Models/User.model");
const Post = require("../Models/Post.model");
const Category = require("../Models/Category.model");

// Define a cron job that runs every day at midnight
cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("Running daily deletion check...");
    const now = new Date();

    try {
      const usersToDelete = await User.find({
        deletionScheduled: true,
        deletionDate: { $lte: now },
      });

      for (const user of usersToDelete) {
        const userId = user._id;

        // Find and delete user's posts
        const userPosts = await Post.find({ author: userId });

        for (const post of userPosts) {
          // Remove post references from categories
          await Category.updateMany(
            { posts: post._id },
            { $pull: { posts: post._id } }
          );

          // Delete the post
          await Post.findByIdAndDelete(post._id);
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        console.log(`User ${userId} and their posts have been deleted.`);
      }
    } catch (err) {
      console.error("Error during deletion check:", err);
    }
  },
  {
    scheduled: true,
    timezone: "utc", // Set your timezone
  }
);
