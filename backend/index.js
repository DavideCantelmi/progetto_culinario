const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./src/models/User/user.routes')
const reciperoutes = require('./src/models/Recipe/recipe.routes')
const notificationRoutes = require('./src/models/Notification/notification.routes')
const challengeRoutes = require('./src/models/Challenge/challenge.routes')
const messageRoutes = require('./src/models/Message/message.routes')
const followRoutes = require('./src/models/Follow/follow.router')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Piattaforma di Condivisione e Scoperta di Ricette')
})
app.use('/api/users', userRoutes)
app.use('/api/recipes', reciperoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', followRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connesso con successo')
    app.listen(PORT, () => console.log(`Server in ascolto su http://localhost:${PORT}`))
  })
  .catch((error) => console.log(error))
