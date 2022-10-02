const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')

// Server settings
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'REMOVE']
    }
})
const PORT = process.env.PORT || 8080

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Routes
const CHAT = require('./routes/api/chat')

// Routes mapping
app.use('/api/chat', CHAT)

// Handle prod
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

// Socket stuff
const { userJoin, getCurrentUser, userLeave } = require('./utils/UsersService')

io.on('connection', (socket) => {
    socket.on('JOIN_ROOM', ({ username, room}) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

        socket.on('SEND_MESSAGE', data => {
            const user = getCurrentUser(socket.id)

            io.to(user.room).emit('MESSAGE', data)
        })

        socket.on('disconnect', () => {
            const user = getCurrentUser(socket.id)

            if (user) {
                userLeave(user.id)
            }
        })
    })
})

// Start server
server.listen(PORT, () => { console.log(`Server started on port : ${PORT}`)})