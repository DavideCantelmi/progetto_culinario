const Message = require('./message.model')

const sendMessage = async (req, res) => {
  const { receiver, content } = req.body

  if (!receiver || !content) {
    return res.status(400).json({ message: 'Receiver and content are required' })
  }

  const message = new Message({
    sender: req.user.id,
    receiver,
    content
  })

  const savedMessage = await message.save()
  res.status(201).json(savedMessage)
}

const getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.conversationId },
      { sender: req.params.conversationId, receiver: req.user.id }
    ]
  }).sort({ createdAt: -1 })

  res.json(messages)
}

module.exports = { sendMessage, getMessages }
