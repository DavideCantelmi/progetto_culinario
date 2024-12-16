const mongoose = require('mongoose')

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' } }],
  votes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' } }]
}, { timestamps: true })

const Challenge = mongoose.model('Challenge', ChallengeSchema)

module.exports = Challenge
