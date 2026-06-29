const Message = require('../models/Message'); // Match your exact file schema name
const User = require('../models/User');

const fetchAllChats = async (req, res) => {   // Change name from fetchAllMessages to match router
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('username');
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getSpecificChatHistory = async (req, res) => {
  try {
    const history = await Message.find({
      $or: [
        { sender: req.user._id, recipient: req.params.recipientId },
        { sender: req.params.recipientId, recipient: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.json(history);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { fetchAllChats, getSpecificChatHistory };