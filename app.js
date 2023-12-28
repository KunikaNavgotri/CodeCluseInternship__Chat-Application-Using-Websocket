const express = require('express')
const path = require('path')
const { Socket } = require('socket.io')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`server on PORT${PORT}`))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

let socketsConected = new Set()
io.on('connection', onconnected)

    function onconnected(socket) {
        console.log(socket.id)
        socketsConected.add(Socket.id)
       io.emit('client-total', socketsConected.size)

    socket.on('disconncet',  () => {
            console.log('socket disconnected', socket.id)
             socketsConected.delete(Socket.id)
             io.emit('client-total', socketsConected.size)
        })

        socket.on('message', (data) =>  {
            //console.log(data)
            socket.broadcast.emit('chat-message', data)
     })

     socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
     })
    }
    