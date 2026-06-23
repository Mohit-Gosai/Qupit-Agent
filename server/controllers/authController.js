// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * 1. USER REGISTER / SIGNUP
 */
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation Check
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        // Check if user already exists
        const emailExists = await User.findOne({ email });
        const usernameExists = await User.findOne({ username });
        if (emailExists || usernameExists) {
            return res.status(400).json({ success: false, message: "Username or Email already registered" });
        }

        // Secure the password by hashing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the clean document to the database
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            profile: { displayName: username } // Default display name to username
        });

        // Generate a secure JWT Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(201).json({
            success: true,
            token,
            message: "Account created successfully!"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 2. USER LOGIN
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation Check
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide both email and password" });
        }

        // Query the user and explicitly request the hidden password field using .select()
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare incoming plain text password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Everything checks out, generate a fresh token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({
            success: true,
            token,
            message: `Welcome back, @${user.username}`
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login };