const letterModel = require('../config/letterConfig')
const userModal = require('../config/userConfig'); // MUST IMPORT USER TO UPDATE ARRAY[cite: 5]

exports.allLetters = async (req, res) => {
    try {
        const letters = await letterModel.find({})
        res.status(200).json({ success: true, message: "data is resived successfully", data: letters })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// In letterRoutes.js
exports.getPublicLitters = async (req, res) => {
    try {
        // Fetch letters marked as public, excluding the message for privacy if needed
        const publicLetters = await Letter.find({ isPrivate: false })
            .select('title recipient relation canvas authorId createdAt')
            .limit(20)
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, data: publicLetters });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};



exports.createLetter = async (req, res) => {
  try {
    // 1. Correct extraction check
    // req.user was attached by protect middleware, so req.user._id is correct
    const letterData = {
      ...req.body,
      authorId: req.user._id, // Use _id (standard MongoDB)
      sender: req.user.userName  
    };
    
    // Change 'Letter' to 'letterModel' to match your import[cite: 5]
    const newLetter = await letterModel.create(letterData);

    // 2. Update the User's createdLetters array
    // Change 'User' to 'userModal' to match the import[cite: 5, 6]
    await userModal.findByIdAndUpdate(req.user._id, {
      $push: { createdLetters: newLetter._id } 
    });

    res.status(201).json({ success: true, data: newLetter });
  } catch (err) {
    // This logs EXACTLY what is missing (e.g., "title is required")[cite: 5]
    console.error("Mongoose Validation Error:", err.message); 
    res.status(400).json({ success: false, error: err.message });
  }
};
// UPDATE/AUTO-SAVE DRAFT
exports.updateLetter = async (req, res) => {
    try {
        // Find by ID and ensure the author owns it
        const updatedLetter = await letterModel.findOneAndUpdate(
            { _id: req.params.id, authorId: req.user.id },
            { $set: req.body }, // Updates nested text/canvas objects automatically
            { new: true, runValidators: true }
        );

        if (!updatedLetter) {
            return res.status(404).json({ success: false, message: "Letter not found" });
        }

        res.status(200).json({ success: true, data: updatedLetter });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

