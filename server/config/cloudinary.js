// server/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary credentials from your root .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Build the storage broker engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Dynamically detect file type to assign correct Cloudinary resource folder configurations
    const isVideo = file.mimetype.startsWith('video');
    
    return {
      folder: isVideo ? 'matrix_loop_videos' : 'matrix_loop_images',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: isVideo ? ['mp4', 'webm', 'mov'] : ['jpg', 'png', 'jpeg', 'webp'],
      transformation: isVideo ? [] : [{ quality: 'auto:good' }] // Optional: compress images slightly on-the-fly
    };
  }
});

const upload = multer({ storage: storage });

module.exports = upload;