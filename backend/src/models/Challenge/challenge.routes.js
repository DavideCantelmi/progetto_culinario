const express = require('express')
const router = express.Router()
const {
  createChallenge,
  getChallenges,
  participateInChallenge,
  voteForChallenge
} = require('../controllers/challengeController')
const { protect } = require('../../middlewares/authMiddleware')

router.post('/', protect, createChallenge)
router.get('/', getChallenges)
router.post('/:id/participate', protect, participateInChallenge)
router.post('/:id/vote', protect, voteForChallenge)

module.exports = router
