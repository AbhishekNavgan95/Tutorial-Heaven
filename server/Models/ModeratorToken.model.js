const mongoose = require('mongoose');
const crypto = require('crypto');

const ModeratorTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Token expires after 1 hour
  },
});

module.exports = mongoose.model('ModeratorToken', ModeratorTokenSchema);
