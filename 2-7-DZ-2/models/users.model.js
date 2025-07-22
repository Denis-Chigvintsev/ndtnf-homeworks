const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_ID: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Users', userSchema);
