const mongoose = require('mongoose');
const userSchema = require('../dataSchema/userSchema');
require('dotenv').config(); // Ensure env is accessible here too

// Use the variable name from your .env file
const uri = process.env.DATABASE; 

// Use mongoose.connect for a standard single-database setup
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log("Connection Error: ", err));

const userModal = mongoose.model("Users", userSchema);

module.exports = userModal;