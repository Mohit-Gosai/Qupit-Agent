const mongoose = require('mongoose');
const letterSchema = require('../dataSchema/lettersSchema');
require('dotenv').config(); // Ensure env is accessible here too

// Use the variable name from your .env file
const uri = process.env.DATABASE; 

// Use mongoose.connect for a standard single-database setup
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log("Connection Error: ", err));

const letterModal = mongoose.model("Letters", letterSchema);

module.exports = letterModal;