const express = require('express');
const router = express.Router();
const { userSignIn, login, allUsers } = require('../controllers/userControler');
const { protect } = require('../middleware/authMiddleware'); // Import the guard
const { createLetter, getPublicLitters, updateLetter, getMyLetters } = require('../controllers/letterControler'); // Import letter controller for protected route


// Public Routes
router.post("/signup", userSignIn);
router.post("/login", login);

// Protected Routes (The Guard is placed before the Controller)
router.get("/userdata", protect, allUsers); 

// Route for creating the initial draft


module.exports = router;