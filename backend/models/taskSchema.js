const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

module.exports = mongoose.model('task', taskSchema);