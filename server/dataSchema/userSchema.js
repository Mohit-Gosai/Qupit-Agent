const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        userEmail: { type: String, required: true, unique: true },
        Password: { type: String, required: true, min: 8 },
        role: { type: String, enum: ["guest", "user"], default: "guest" },
        addedAt: { type: Date, default: Date.now },
        isLogged: { type: Boolean }
    }
)

userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('userPassword')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        // Added await here
        this.userPassword = await bcrypt.hash(this.userPassword, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = userSchema;