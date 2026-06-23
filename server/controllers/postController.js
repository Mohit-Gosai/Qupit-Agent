// server/controllers/postController.js
const Post = require('../models/Post');

/**
 * 1. CREATE A NEW POST
 */
const createPost = async (req, res) => {
    try {
        const { contentType, caption, tags } = req.body;

        if (!contentType) {
            return res.status(400).json({ success: false, message: "Content type is required" });
        }

        // Safety fallback check for development testing if auth isn't fully mounted
        const authorId = req.user?._id || req.body.userId;
        if (!authorId) {
            return res.status(401).json({ success: false, message: "User session not found. Please log in." });
        }

        // Process file stream path if provided by Multer middleware
        let finalContentUrl = '';
        if (req.file) {
            finalContentUrl = req.file.path; // Cloudinary CDN link lives here!
        } else if (req.body.contentUrl) {
            finalContentUrl = req.body.contentUrl;
        }

        // Format comma-separated strings back into standard lowercase arrays
        const formattedTags = tags ? tags.split(',').map(tag => tag.trim().toLowerCase()) : [];

        const newPost = await Post.create({
            author: authorId,
            contentType,
            contentUrl: finalContentUrl,
            caption: caption || '',
            tags: formattedTags
        });

        res.status(201).json({
            success: true,
            message: "Post published cleanly!",
            post: newPost
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 2. GET ALL POSTS FOR THE TIMELINE FEED
 */
const getAllPosts = async (req, res) => {
    try {
        // Fetch posts, sort by newest first, and automatically populate author details
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('author', 'username profile.displayName profile.avatarUrl');

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 3. LIKE / UNLIKE A POST (Toggle Mechanism)
 */
const toggleLikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Check if the current user's ID is already inside the likes array
        const isLiked = post.likes.includes(req.user._id);

        if (isLiked) {
            // Unlike: Remove the user's ID from the array
            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
            await post.save();
            return res.status(200).json({ success: true, message: "Post unliked", likesCount: post.likes.length });
        } else {
            // Like: Push the user's ID into the array
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({ success: true, message: "Post liked!", likesCount: post.likes.length });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 4. ADD A COMMENT TO A POST
 */
const addComment = async (req, res) => {
  try {
    const { id } = req.params; // Post ID
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: "Comment text cannot be empty." });
    }

    // 1. Find the target post document
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    // 2. Push the new comment structure into the array
    const newComment = {
      user: req.user._id, // Tied from your protect/auth middleware
      text: text,
      createdAt: new Date()
    };
    post.comments.push(newComment);

    // 3. Save the changes to the database
    await post.save();

    // 4. CRITICAL STEP: Fully populate the comments user fields before responding!
    // This deep populates the user block inside the comments array with their profile context.
    const populatedPost = await Post.findById(id).populate({
      path: 'comments.user',
      select: 'username profile.displayName profile.avatarUrl' // Pulls exactly what the frontend needs
    });

    // 5. Return the updated, fully populated comments array back to the client
    return res.status(200).json({
      success: true,
      message: "Comment added successfully.",
      comments: populatedPost.comments 
    });

  } catch (error) {
    console.error("Error inside addComment controller:", error);
    return res.status(500).json({ success: false, message: "Server error processing comment pipeline." });
  }
};

// Add this inside server/controllers/postController.js

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    // Find the comment inside the array
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found." });
    }

    // 🔒 Security Check: Must be the comment author OR the post owner to delete it
    const isCommentAuthor = comment.user.toString() === req.user._id.toString();
    const isPostOwner = post.author.toString() === req.user._id.toString();

    if (!isCommentAuthor && !isPostOwner) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this comment." });
    }

    // Pull the subdocument from the array
    comment.deleteOne();
    await post.save();

    // Send back the updated, populated comments array to sync the frontend UI instantly
    const populatedPost = await Post.findById(postId).populate({
      path: 'comments.user',
      select: 'username profile.displayName profile.avatarUrl'
    });

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
      comments: populatedPost.comments
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Add deleteComment to your module.exports line at the bottom!



module.exports = { createPost, getAllPosts, toggleLikePost, addComment, deleteComment };