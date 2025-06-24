const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({

  title: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  }

})

module.exports = mongoose.model('project', projectSchema);
