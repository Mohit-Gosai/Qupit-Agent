// server/routes/posts.js
const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { createPost, getAllPosts, toggleLikePost, addComment, deleteComment } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Ensure this handles a base root path request cleanly if HomeFeed calls /api/posts
router.get('/', getAllPosts); 
router.get('/all', getAllPosts); // Also maps to /api/posts/all as a backup

router.post('/create', protect, upload.single('file'), createPost);
router.put('/like/:id', protect, toggleLikePost);
router.post('/comment/:id', protect, addComment);
// router.delete('/:postId/comment/:commentId', protect, deleteComment);

module.exports = router;