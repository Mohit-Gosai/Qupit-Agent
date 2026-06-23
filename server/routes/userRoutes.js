// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getMe, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Your auth gate

// 1. Specific static routes MUST come first!
router.get('/me', protect, getMe); 

// 2. Dynamic wildcard routes MUST come last!
router.get('/:username', getUserProfile); 
router.put('/update', protect, updateUserProfile);

module.exports = router;