const express = require('express')
const app = express()
const socket = require('socket.io')

const server = app.listen(8080, () => {
  console.log('running server on port 8080')
})

const io = socket(server) // initialize a new instance of socket.io by passing the server object
io.on('connection', socket => {
  console.log(socket.id)

  socket.on('SEND_MESSAGE', userData => {
    io.emit('RECEIVE_MESSAGE', userData)
  })
})
