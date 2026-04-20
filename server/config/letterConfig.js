const mongoose = require('mongoose');
const letterSchema = require('../dataSchema/lettersSchema');

const letterModal = mongoose.model("Letters", letterSchema);

module.exports = letterModal;