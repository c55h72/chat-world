const socket = io()

window.addEventListener('load', () => {
  randomUser()
})

socket.on('broadcast-message', (data) => {
  newChatBox(data.username, data.message)
})


document.querySelector('#submit').addEventListener('click', () => {
  sendOut()
})

document.querySelector('#message').addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    sendOut()
  }
})
