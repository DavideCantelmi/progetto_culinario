const Notification = require('./notification.model')

const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(notifications)
}

const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id)
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' })
  }
  if (notification.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' })
  }
  notification.read = true
  await notification.save()
  res.json({ message: 'Notification marked as read' })
}

module.exports = { getNotifications, markAsRead }
