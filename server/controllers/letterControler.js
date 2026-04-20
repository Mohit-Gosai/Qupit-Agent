const letterModel = require('../config/letterConfig')

const allLetters = async (req, res) => {
    try {
        const letters = await letterModel.find({})
        res.status(200).json({ success: true, message: "data is resived successfully", data: letters })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = { allLetters }