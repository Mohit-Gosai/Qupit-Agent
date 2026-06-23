// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // 1. Check if the token exists in the Authorization Header (Format: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token string from the header array split
            token = req.headers.authorization.split(' ')[1];

            // 2. Decode and verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Fetch the user document from the database using the ID inside the token
            // We use .select('-password') here to completely exclude the password hash from the request lifecycle
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ success: false, message: "User session not found in system" });
            }

            // 4. Everything checks out perfectly! Move forward to the next function in line
            next();

        } catch (error) {
            console.error(`❌ Middleware Token Verification Failure: ${error.message}`);
            return res.status(401).json({ success: false, message: "Not authorized, token validation failed" });
        }
    }

    // If no token was found at all in the headers
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, missing session token" });
    }
};

module.exports = { protect };