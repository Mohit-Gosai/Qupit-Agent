const express = require('express');
const router = express.Router();
const { userSignIn, login } = require('../controllers/userControler');

router.post("/signup", userSignIn);
router.post("/login", login); // Change this to /login

module.exports = router;