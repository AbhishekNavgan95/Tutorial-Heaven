const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Comment", CommentSchema);