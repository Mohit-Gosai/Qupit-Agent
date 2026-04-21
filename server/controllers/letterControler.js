const letterModel = require('../config/letterConfig')

const allLetters = async (req, res) => {
    try {
        const letters = await letterModel.find({})
        res.status(200).json({ success: true, message: "data is resived successfully", data: letters })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const createLetter = async (req, res) => {
    try {
        // Because of the 'protect' middleware, we have req.user.id
        const newLetter = await letterModal.create({
            ...req.body,
            authorId: req.user.id, // Securely assigned from the token
            sender: req.user.username 
        });
        
        res.status(201).json({ success: true, data: newLetter });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = { allLetters, createLetter }