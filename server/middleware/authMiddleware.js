const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const userModal = require('../config/userConfig');

const protect = async (req, res, next) => {
    try {
        let token;
        // 1. Check if token exists in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "You are not logged in. Please log in to get access." 
            });
        }

        // 2. Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3. Check if user still exists
        const currentUser = await userModal.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ 
                success: false, 
                message: "The user belonging to this token no longer exists." 
            });
        }

        // 4. GRANT ACCESS to protected route
        // We attach the user to the request object so the next function can use it
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }
};

module.exports = { protect };