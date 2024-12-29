const express = require('express')
const router = express.Router()
const { getNotifications, markAsRead } = require('./notification.controller')
const { protect } = require('../../middlewares/authMiddleware')

router.get('/', protect, getNotifications)
router.put('/:id/read', protect, markAsRead)

module.exports = router
