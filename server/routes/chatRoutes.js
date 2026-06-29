// server/routes/chat.js
const express = require('express');
const router = express.Router();
const { fetchAllChats, getSpecificChatHistory } = require('../controllers/chatController');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware'); // Your standard authentication shield

// Fetch all available chat users
router.get('/users', protect, fetchAllChats);
// Fetch conversational history with a specific person
router.get('/history/:recipientId', protect, getSpecificChatHistory);

module.exports = router;