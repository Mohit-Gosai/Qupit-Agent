// server/models/Letter.js
const mongoose = require('mongoose');

const LetterSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'A title for your letter is required'],
      trim: true,
    },
    // The sequence of scrollable canvas sections (Our Instagram Story-style slides)
    sections: [
      {
        themeTemplate: { type: String, default: 'classic-minimalist' }, // e.g., neon-cyberpunk, warm-vintage
        mediaUrl: { type: String, default: '' }, // Background image/animation link
        textContent: { type: String, required: true },
        fontFamily: { type: String, default: 'serif' },
        animationType: { type: String, default: 'fade-in' } // How this slide reveals itself on scroll
      }
    ],
    isPublic: { type: Boolean, default: true }, // Can it be discovered on the public feed?
    viewsCount: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Letter', LetterSchema);