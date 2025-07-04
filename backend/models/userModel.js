const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'pm', 'developer'],
    default: 'developer'
  },
  profilePic: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }

})

module.exports = mongoose.model('user', userSchema);
