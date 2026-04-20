const mongoose = require('mongoose');
const userSchema = require('../dataSchema/userSchema');

// We simply create and export the Model. 
// No more mongoose.connect() here!
const userModal = mongoose.model("Users", userSchema);

module.exports = userModal;