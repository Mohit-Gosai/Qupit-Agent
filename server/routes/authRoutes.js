// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Map endpoints to their matching controller functions
router.post('/signup', register);
router.post('/login', login);

module.exports = router;