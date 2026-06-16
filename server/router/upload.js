const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Optional upload timeout (ms)
const UPLOAD_TIMEOUT_MS = parseInt(process.env.CLOUDINARY_UPLOAD_TIMEOUT_MS || '60000', 10);

// 2. Configure Multer memory storage (keeps file in memory stream instead of writing to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3. Your Authentication Middleware (Ensure it matches your current project setup)
// const protect = require('../middleware/authMiddleware'); 

router.post('/upload', upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Log helpful diagnostics
    console.log(`Upload received: filename=${req.file.originalname} mimetype=${req.file.mimetype} size=${req.file.size}`);

    // Determine resource type. Use 'auto' as fallback so Cloudinary detects correctly.
    let resourceType = 'auto';
    if (req.file.mimetype.startsWith('image/')) resourceType = 'image';
    else if (req.file.mimetype.startsWith('video/')) resourceType = 'video';
    else if (req.file.mimetype.startsWith('audio/')) resourceType = 'video'; // audio often falls under video on Cloudinary

    // 4. Stream upload directly to Cloudinary from memory buffer with a safety timeout
    const options = {
      folder: 'qupit_love_letters',
      resource_type: resourceType
    };

    let timedOut = false;

    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      clearTimeout(timeoutId);
      if (timedOut) return; // already handled

      if (error) {
        console.error('Cloudinary Error:', error);
        // Surface HTTP code if present for easier debugging
        const status = (error.http_code && Number.isInteger(error.http_code)) ? error.http_code : 500;
        return res.status(status).json({ success: false, message: error.message || 'Cloudinary upload failed', details: error });
      }

      // Return secure url to front-end client
      return res.status(200).json({
        success: true,
        url: result.secure_url,
        raw: result
      });
    });

    // Create a readable stream from the buffer and pipe into Cloudinary upload stream
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadStream);

    // Safety timeout to abort long-running uploads
    const timeoutId = setTimeout(() => {
      timedOut = true;
      console.error(`Cloudinary upload timed out after ${UPLOAD_TIMEOUT_MS}ms`);
      try {
        // Destroy the stream to abort the upload
        uploadStream.destroy(new Error('Cloudinary upload timed out'));
      } catch (e) {
        console.error('Error destroying upload stream after timeout:', e);
      }
      return res.status(504).json({ success: false, message: 'Cloudinary upload timed out' });
    }, UPLOAD_TIMEOUT_MS);

  } catch (err) {
    console.error('Server Upload Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during upload.', details: err.message });
  }
});

module.exports = router;