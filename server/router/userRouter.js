const express = require('express');
const router = express.Router();
const { userSignIn, login, allUsers } = require('../controllers/userControler');
const { protect } = require('../middleware/authMiddleware'); // Import the guard
const { createLetter, updateLetter } = require('../controllers/letterControler'); // Import letter controller for protected route

// Public Routes
router.post("/signup", userSignIn);
router.post("/login", login);

// Protected Routes (The Guard is placed before the Controller)
router.get("/userdata", protect, allUsers); 

// Route for creating the initial draft
router.post('/Letters', protect, createLetter);

// Route for the Auto-Save (The one your frontend useEffect calls)
router.put('/letters/:id', protect, updateLetter);

module.exports = router;