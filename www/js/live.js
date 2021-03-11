const socket = io()

window.addEventListener('load', () => {
  randomBG()
  randomUser()
})

socket.on('broadcast-message', (data) => {
  newChatBox(data.username, data.message)
})


document.querySelector('#submit').addEventListener('click', () => {
  const username = document.querySelector('#username').value
  const message = document.querySelector('#message').value
  newChatBox(username, message)
  socket.emit('new-chat-message', { username, message })
})
