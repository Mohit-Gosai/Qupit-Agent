// server/models/User.js
const mongoose = require('mongoose');
const post = require('./Post'); // Import the Post model for relational reference

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      // Hides the password from GET queries automatically unless explicitly requested
      select: false, 
    },
    
    // Minimal profile configuration block
    profile: {
      displayName: { type: String, default: '' },
      bio: { type: String, maxLength: 160, default: '' },
      avatarUrl: { type: String, default: '' },
    },

    // Relational Graph arrays for the social system
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers back to this exact same userModal collection
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt tracking fields
  }
);

UserSchema.pre('findOneAndDelete', async function (next) {
  try {
    const query = this.getQuery(); // Gets the query criteria (e.g., { _id: "..." })
    const userToDelete = await this.model.findOne(query);

    if (userToDelete) {
      // Delete all posts where this user is the author
      await Post.deleteMany({ author: userToDelete._id });
      console.log(`💥 Cleaned up all posts belonging to User: ${userToDelete._id}`);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Export the compiled model configuration
module.exports = mongoose.model('User', UserSchema);