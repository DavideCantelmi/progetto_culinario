const User = require('../User/user.model')

const followUser = async (req, res) => {
  const userToFollow = await User.findById(req.params.id)
  const currentUser = await User.findById(req.user.id)

  if (!userToFollow) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (userToFollow.followers.includes(req.user.id)) {
    return res.status(400).json({ message: 'Already following this user' })
  }

  userToFollow.followers.push(req.user.id)
  currentUser.following.push(req.params.id)

  await userToFollow.save()
  await currentUser.save()

  res.json({ message: 'User followed successfully' })
}

const unfollowUser = async (req, res) => {
  const userToUnfollow = await User.findById(req.params.id)
  const currentUser = await User.findById(req.user.id)

  if (!userToUnfollow) {
    return res.status(404).json({ message: 'User not found' })
  }

  userToUnfollow.followers = userToUnfollow.followers.filter(f => f.toString() !== req.user.id)
  currentUser.following = currentUser.following.filter(f => f.toString() !== req.params.id)

  await userToUnfollow.save()
  await currentUser.save()

  res.json({ message: 'User unfollowed successfully' })
}

const getFollowers = async (req, res) => {
  const user = await User.findById(req.params.id).populate('followers', 'nickname')
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json(user.followers)
}

const getFollowing = async (req, res) => {
  const user = await User.findById(req.params.id).populate('following', 'nickname')
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json(user.following)
}

module.exports = { followUser, unfollowUser, getFollowers, getFollowing }
