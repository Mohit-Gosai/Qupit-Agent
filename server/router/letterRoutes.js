const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); //
const { 
  createLetter, 
  getMyLetters, // Import the new controller function
  updateLetter,
  getPublicLitters
} = require('../controllers/letterControler');

router.post('/Letters', protect, createLetter);
// Route for fetching public letters
router.get('/public-letters', getPublicLitters);
// Route for updating the draft (Auto-Save)

// Route for the Auto-Save (The one your frontend useEffect calls)
router.put('/letters/:id', protect, updateLetter);

router.get('/my-missions', protect, getMyLetters); // Ensure 'protect' is used[cite: 3]

module.exports = router;