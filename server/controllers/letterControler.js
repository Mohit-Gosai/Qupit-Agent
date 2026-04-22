const letterModel = require('../config/letterConfig')

exports.allLetters = async (req, res) => {
    try {
        const letters = await letterModel.find({})
        res.status(200).json({ success: true, message: "data is resived successfully", data: letters })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}


// CREATE INITIAL DRAFT
exports.createLetter = async (req, res) => {
    try {
        const { title, recipient, relation, slug } = req.body;
        const newLetter = new letterModel({
            authorId: req.user.id, // From your auth middleware
            title,
            recipient,
            relation,
            slug,
            // Default empty message to start
            message: "Start writing your secret message..." 
        });
        const savedLetter = await newLetter.save();
        res.status(201).json({ success: true, data: savedLetter });
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

