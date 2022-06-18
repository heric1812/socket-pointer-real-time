require('dotenv').config()
const express = require('express')
const http = require('http')

const Server = require('socket.io').Server
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3400

const cors = require('cors')
const app = express()

// {
//   room_name: {
//     socket_id: { name: '', x: 0, y: 0 },
//     socket_id: { name: '', x: 0, y: 0 },
//     ...
//   },
//   ...
// }
const rooms = {}

const httpServer = http.createServer({}, app)
const io = new Server(httpServer, {
  path: '/',
  cors: true,
  origins: '*',
})
const router = express.Router()

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
)

io.engine.on('connection_error', (err) => {
  console.log(err.req) // the request object
  console.log(err.code) // the error code, for example 1
  console.log(err.message) // the error message, for example "Session ID unknown"
  console.log(err.context) // some additional error context
})

io.on('connection', (socket) => {
  console.log('Connected socket!!')

  socket.on('join_room', (data) => {
    console.log('join_room', data)
    if (!rooms[data.room]) rooms[data.room] = {}

    if (rooms[data.room]) {
      rooms[data.room][data.user.name] = data.user
    }

    socket.join(data.room)
  })

  socket.on('update_position', (data) => {
    if (rooms[data.room]) {
      rooms[data.room][data.user.name] = data.user
    }

    io.to(data.room).emit('update_pointers', rooms[data.room])
  })

  socket.on('remove_position', (data) => {
    if (rooms[data.room] && rooms[data.room][data.user.name]) {
      delete rooms[data.room][data.user.name]
    }

    io.to(data.room).emit('update_pointers', rooms[data.room])
  })
})

io.on('disconnect', (socket) => {
  console.log('Disconnected socket!!')

  if (rooms['room1'] && rooms['room1'][data.user.name]) {
    delete rooms['room1'][data.user.name]
  }

  io.to('room1').emit('update_pointers', rooms['room1'])
})

// Routes publics
router.get('/', (req, res) => {
  res.send('Hello World!')
})

// parse application/json
const jsonParser = bodyParser.json()

app.use(router)

httpServer.listen(PORT, function () {
  console.log(`Web server listening on port ${PORT}`)
})
