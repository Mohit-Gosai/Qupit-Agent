const userModal = require('../config/userConfig')
const bcrypt = require('bcrypt')


const allUsers = async (req, res) => {
    try {
        const user = await userModal.find(req.body);
        res.status(200).json({ staus: "OK", message: "all users on qupit againt is avalaible hare!!", data: user })
    } catch (error) {
        res.status(500).json({ staus: "OK", message: "users are not found!!", data: error.message })
    }
}

const userSignIn = async (req, res) => {
    try {
        const { userName, userEmail, password } = req.body;

        // MISSING CHECK 1: Check if all fields exist
        if (!userName || !userEmail || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // MISSING CHECK 2: Prevent duplicate emails
        const exists = await userModal.findOne({ userEmail });
        if (exists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Proceed to create
        const newUser = await userModal.create({ userName, userEmail, password });
        res.status(201).json({ success: true, data: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { userSignIn, allUsers }