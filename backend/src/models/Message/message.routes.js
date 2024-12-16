const express = require('express')
const router = express.Router()
const { sendMessage, getMessages } = require('./message.controller')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, sendMessage)
router.get('/:conversationId', protect, getMessages)

module.exports = router
