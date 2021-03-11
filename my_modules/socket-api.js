module.exports = (socket, io) => {
  console.log('a user connected')

  socket.on('new-chat-message', (data) => {
    socket.broadcast.emit('broadcast-message', data)
  })

}
