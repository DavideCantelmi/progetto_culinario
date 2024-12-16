const User = require('./user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
  const { nickname, name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ nickname, name, email, password: hashedPassword })
  if (user) {
    res.status(201).json({ message: 'User registered successfully' })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.json({ token })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) {
    res.json({
      id: user._id,
      nickname: user.nickname,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      allergies: user.allergies,
      points: user.points,
      badges: user.badges,
      level: user.level
    })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) {
    user.nickname = req.body.nickname || user.nickname
    user.name = req.body.name || user.name
    user.preferences = req.body.preferences || user.preferences
    user.allergies = req.body.allergies || user.allergies
    await user.save()
    res.json({ message: 'Profile updated successfully' })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }
