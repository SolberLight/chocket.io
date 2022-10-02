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
io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', data => {
        io.emit('MESSAGE', data)
    })
})

// Start server
server.listen(PORT, () => { console.log(`Server started on port : ${PORT}`)})