const express = require('express')
const router = express.Router()
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/followController')
const { protect } = require('../../middlewares/authMiddleware')

router.post('/:id/follow', protect, followUser)
router.post('/:id/unfollow', protect, unfollowUser)
router.get('/:id/followers', getFollowers)
router.get('/:id/following', getFollowing)

module.exports = router
