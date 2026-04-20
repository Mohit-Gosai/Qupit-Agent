const express = require('express')
const router = express.Router();
const { userSignIn, allUsers } = require('../controllers/userControler')

router.post("/userdata", userSignIn)
router.get("/userdata", allUsers)

module.exports = router