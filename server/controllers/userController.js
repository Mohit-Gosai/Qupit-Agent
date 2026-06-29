// server/controllers/userController.js
const User = require('../models/User');
const Post = require('../models/Post');

/**
 * @desc    Get all registered users (except current user)
 * @route   GET /api/users
 * @access  Private
 */
const getAllUsers = async (req, res) => {
  try {
    // Exclude the logged-in user, return only necessary data fields
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select('username email createdAt profile followers following');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Get complete metadata profile by username for details page
 * @route   GET /api/users/profile/:username
 * @access  Private
 */
const getUserProfileDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('username email createdAt profile followers following');
    
    if (!user) {
      return res.status(404).json({ message: "User profile target block unresolved." });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

    const getMe = async (req, res) => {
        try {
            // req.user was securely injected upstream by the protect middleware gate
            const user = await User.findById(req.user._id).select('-password');

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({
                success: true,
                profile: {
                    username: user.username,
                    displayName: user.profile.displayName || user.username,
                    bio: user.profile.bio,
                    avatarUrl: user.profile.avatarUrl
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    /**
     * FETCH PROFILE DASHBOARD DATA BY DYNAMIC USERNAME
     */
    const getUserProfile = async (req, res) => {
        try {
            const { username } = req.params;

            // Force lookups using URL parameters instead of logged-in context values!
            const userProfile = await User.findOne({ username: username.toLowerCase() }).select('-password');

            if (!userProfile) {
                return res.status(404).json({ success: false, message: "User profile not found" });
            }

            const userPosts = await Post.find({ author: userProfile._id }).sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                profile: {
                    userId: userProfile._id,
                    username: userProfile.username,
                    displayName: userProfile.profile.displayName || userProfile.username,
                    bio: userProfile.profile.bio,
                    avatarUrl: userProfile.profile.avatarUrl,
                    followersCount: userProfile.followers.length,
                    followingCount: userProfile.following.length
                },
                posts: userPosts
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    /**
     * UPDATE AUTHENTICATED USER PROFILE
     */
    const updateUserProfile = async (req, res) => {
        try {
            // Find the user document using the secure ID attached by authMiddleware
            const user = await User.findById(req.user._id);

            if (!user) {
                return res.status(404).json({ success: false, message: "User session not found" });
            }

            const { displayName, bio, avatarUrl } = req.body;

            // Update fields safely if they are provided in the request body
            if (displayName !== undefined) user.profile.displayName = displayName;
            if (bio !== undefined) user.profile.bio = bio;
            if (avatarUrl !== undefined) user.profile.avatarUrl = avatarUrl;

            // Save the updated document back to the database
            const updatedUser = await user.save();

            res.status(200).json({
                success: true,
                message: "Profile updated cleanly!",
                profile: {
                    username: updatedUser.username,
                    displayName: updatedUser.profile.displayName,
                    bio: updatedUser.profile.bio,
                    avatarUrl: updatedUser.profile.avatarUrl,
                    updatedAt: updatedUser.updatedAt
                }
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };




    module.exports = { getMe, getUserProfile, updateUserProfile, getAllUsers, getUserProfileDetails };