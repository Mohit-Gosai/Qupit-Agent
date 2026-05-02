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

// Controller
exports.getMyLetters = async (req, res) => {
    try {
        // Find only letters where authorId matches the authenticated user[cite: 3]
        const letters = await letterModel.find({ authorId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: letters });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Route



exports.createLetter = async (req, res) => {
    try {
        const letterData = {
            ...req.body,
            // Use req.user (populated by your protect middleware)
            authorId: req.user._id,
            sender: req.user.username // Match the key in your User schema
        };

        const newLetter = await letterModel.create(letterData);

        await userModal.findByIdAndUpdate(req.user._id, {
            $push: { createdLetters: newLetter._id }
        });

        res.status(201).json({ success: true, data: newLetter });
    } catch (err) {
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

