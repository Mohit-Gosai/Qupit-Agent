const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // The "Agent Name" or handle (e.g., Matrix)
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        trim: true,
        minLength: [3, "Username must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false // This prevents the password from being returned in API calls by default
    },
    // Useful for the "From: [Name]" part of the letters
    displayName: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    // Array of Letter IDs created by this user
    createdLetters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Letter'
        }
    ]
}, { timestamps: true });

// Pre-save middleware to hash password before saving to MongoDB
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Instance method to check if password is correct during login
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;