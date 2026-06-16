const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure Multer memory storage (keeps file in memory stream instead of writing to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3. Your Authentication Middleware (Ensure it matches your current project setup)
// const { protect } = require('../middleware/authMiddleware'); 

router.post('/api/upload', upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Determine resource type based on file mimetype (image, video, raw/audio)
    let resourceType = 'image';
    if (req.file.mimetype.startsWith('video/')) resourceType = 'video';
    if (req.file.mimetype.startsWith('audio/')) resourceType = 'video'; // Cloudinary treats audio as video structure

    // 4. Stream upload directly to Cloudinary from memory buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'qupit_love_letters',
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ success: false, message: 'Cloudinary upload failed' });
        }
        
        // Return secure url to front-end client
        return res.status(200).json({
          success: true,
          url: result.secure_url
        });
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (err) {
    console.error('Server Upload Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during upload.' });
  }
});

module.exports = router;