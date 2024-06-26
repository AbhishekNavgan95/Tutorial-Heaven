const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: Object,
    },
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    ]
});

module.exports = mongoose.model("Category", CategorySchema);