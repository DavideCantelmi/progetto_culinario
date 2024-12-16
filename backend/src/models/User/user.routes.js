const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('./user.controller')
const { protect } = require('../../middlewares/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)

module.exports = router
