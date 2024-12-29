const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const userRoutes = require('./src/models/User/user.routes')
const recipeRoutes = require('./src/models/Recipe/recipe.routes')
const notificationRoutes = require('./src/models/Notification/notification.router')
const challengeRoutes = require('./src/models/Challenge/challenge.routes')
const messageRoutes = require('./src/models/Message/message.routes')
const followRoutes = require('./src/models/Follow/follow.router')
const getLeaderboard = require('./src/leaderboard')

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Piattaforma di Condivisione e Scoperta di Ricette')
})
app.use('/api/users', userRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', followRoutes)
app.get('/api/leaderboard', getLeaderboard)

const messages = []

io.on('connection', (socket) => {
  console.log('Un utente si è connesso:', socket.id)

  socket.on('chatMessage', (data) => {
    messages.push({ user: data.user, message: data.message, timestamp: new Date() })
    io.emit('chatMessage', data)
  })

  socket.on('disconnect', () => {
    console.log('Utente disconnesso:', socket.id)
  })
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connesso con successo')
    server.listen(PORT, () => console.log(`Server in ascolto su http://localhost:${PORT}`))
  })
  .catch((error) => console.log(error))
