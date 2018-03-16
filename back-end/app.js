const express = require('express')
const app = express()
const socket = require('socket.io')

const server = app.listen(8080, () => {
  console.log('running server on port 8080')
})

const io = socket(server) // initialize a new instance of socket.io by passing the server object
io.on('connection', socket => {
  console.log(socket.id)

  socket.on('ROOM', user => {
    socket.join(user.room)
    console.log(`${user.author} joins room ${user.room}`)
  })

  socket.on('SEND_MESSAGE', userData => {
    console.log('SEND_MESSAGE')
    io.to(userData.room).emit('RECEIVE_MESSAGE', userData)
  })
})
