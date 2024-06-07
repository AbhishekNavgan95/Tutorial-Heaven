const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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