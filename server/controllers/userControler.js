const userModal = require('../config/userConfig');
const jwt = require('jsonwebtoken');

// Helper function to create JWT
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// SIGNUP 
const userSignIn = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Check if user already exists
        const userExists = await userModal.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Create new user (Schema middleware will hash the password)
        const newUser = await userModal.create({
            username,
            email,
            password
        });

        // 3. Generate Token
        const token = signToken(newUser._id);

        res.status(201).json({
            success: true,
            token,
            data: { user: newUser }
        });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};



// LOGIN 
// userControler.js

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation check
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide both email and password" 
            });
        }

        // 2. Find user & explicitly select password (because select: false in schema)
        const user = await userModal.findOne({ email }).select('+password');

        // 3. Check if user exists and password matches
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ 
                success: false, 
                message: "Incorrect email or password" 
            });
        }

        // 4. If everything is okay, send the token
        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            token,
            message: "Logged in successfully!"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { userSignIn, login };