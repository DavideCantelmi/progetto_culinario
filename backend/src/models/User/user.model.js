const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: true },
  preferences: { type: [String], default: [] },
  allergies: { type: [String], default: [] },
  profileImage: { type: String, default: '' },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  level: { type: Number, default: 1 },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User
