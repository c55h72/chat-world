

function randomUser () {
  const randoNumbo = Math.floor(Math.random() * 10000)
  document.getElementById('username').value = `user${randoNumbo}`
}

function newChatBox (username, message) {
  const scroll = document.querySelector('#scroll')
  scroll.innerHTML += `
    <div class="row">
      <div class="user-info">
        <b>${username}:</b>
      </div>
      <span>${message}</span>
    </div>
  `
}

function sendOut() {
  const username = document.querySelector('#username').value
  const message = document.querySelector('#message').value
  newChatBox(username, message)
  socket.emit('new-chat-message', { username, message })
}

function newPlayer(myself){
  const geo = new THREE.ConeBufferGeometry(6,8,16)
  const mat = new THREE.MeshNormalMaterial()
  const cone = new THREE.Mesh(geo, mat)
  scene.add(cone)
  cone.rotation.y = Math.PI / 4
  cone.rotation.x = Math.PI / 16
  //cone.position = myself
}
