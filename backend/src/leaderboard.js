const { User } = require('./models/User/user.model')

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ points: -1 }).limit(10).select('nickname points badge')
    res.status(200).json(leaderboard)
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero della classifica.' })
  }
}

module.exports = getLeaderboard
