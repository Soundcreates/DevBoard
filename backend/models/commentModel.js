const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  content: String,
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

module.exports = mongoose.model('comment', commentSchema);
