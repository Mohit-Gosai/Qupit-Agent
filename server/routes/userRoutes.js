// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getMe, getUserProfile, updateUserProfile, getAllUsers, getUserProfileDetails } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Your auth gate

// 1. Specific static routes MUST come first!
router.get('/me', protect, getMe); 
// Base Route: /api/users
router.get('/', protect, getAllUsers);

// Sub-Route for metadata views: /api/users/profile/:username
router.get('/profile/:username', protect, getUserProfileDetails);

// 2. Dynamic wildcard routes MUST come last!
router.get('/:username', getUserProfile); 
router.put('/update', protect, updateUserProfile);

module.exports = router;