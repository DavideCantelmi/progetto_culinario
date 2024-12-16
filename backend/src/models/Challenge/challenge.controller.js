const Challenge = require('./challenge.model')

const createChallenge = async (req, res) => {
  const { title, description, theme, startDate, endDate } = req.body
  const challenge = new Challenge({ title, description, theme, startDate, endDate })
  const savedChallenge = await challenge.save()
  res.status(201).json(savedChallenge)
}

const getChallenges = async (req, res) => {
  const challenges = await Challenge.find()
  res.json(challenges)
}

const participateInChallenge = async (req, res) => {
  const { recipeId } = req.body
  const challenge = await Challenge.findById(req.params.id)
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' })
  }

  const alreadyParticipated = challenge.participants.find(p => p.user.toString() === req.user.id)
  if (alreadyParticipated) {
    return res.status(400).json({ message: 'You have already participated in this challenge' })
  }

  challenge.participants.push({ user: req.user.id, recipe: recipeId })
  await challenge.save()
  res.json({ message: 'Participation added successfully' })
}

const voteForChallenge = async (req, res) => {
  const { recipeId } = req.body
  const challenge = await Challenge.findById(req.params.id)
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' })
  }

  const alreadyVoted = challenge.votes.find(v => v.user.toString() === req.user.id)
  if (alreadyVoted) {
    return res.status(400).json({ message: 'You have already voted in this challenge' })
  }

  challenge.votes.push({ user: req.user.id, recipe: recipeId })
  await challenge.save()
  res.json({ message: 'Vote added successfully' })
}

module.exports = { createChallenge, getChallenges, participateInChallenge, voteForChallenge }
