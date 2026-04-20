const express = require('express');
const router = express.Router();
const { userSignIn, login, allUsers } = require('../controllers/userControler');

router.post("/signup", userSignIn);
router.post("/login", login);
router.get("/users", allUsers);

module.exports = router;