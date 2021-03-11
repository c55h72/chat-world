let controls, renderer, scene, camera
let cube
let player


setup()
draw()

function setup(){
  //create scene and camera
  scene = new THREE.Scene()
  const ar = innerWidth / innerHeight
  camera =  new THREE.PerspectiveCamera(75, ar, 0.1, 1000)

  //move camera away from origin
  camera.position.set(1,1,10)


  //light
  // light = new THREE.DirectionalLight(0xffffff, 0.5)
  // light.position.set( 2, 2, 2 )
  // light.rotation.set( Math.PI/2, 2, 2 )
  // scene.add(light)

  // const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
  // light.position.set( 0.5, 1, 0.75 );
  // scene.add( light );

  //
  window.addEventListener('keydown', () => {

    // console.log(event.keyCode)
  if (event.keyCode === 87){
    moveForward()
  } else if (event.keyCode === 83) {
    moveBackward()
  } else if (event.keyCode === 65) {
    moveLeft()
  } else if (event.keyCode === 68) {
    moveRight()
  }
  })
window.addEventListener('keydown', () => {
  if (event.keyCode === 37) {
      rotateLeft()
  } else if (event.keyCode === 39) {
      rotateRight()
    }
})






  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100,10,10),
    new THREE.MeshNormalMaterial())
  ground.rotation.x = - Math.PI / 2 // rotates X/Y to X/Z
  scene.add( ground )
  // gen terrain
  terrain = new TerrainGen(scene)

  cube = new RotatingCube(scene)




  //set up renderer **??** does this always have to be at the end?
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize)




}



function onWindowResize() {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
}



function moveForward(){
  camera.position.z -= 1
}
function moveBackward(){
  camera.position.z += 1
}
function moveLeft(){
  camera.position.x -= 1
}
function moveRight(){
  camera.position.x += 1
}

function rotateLeft(){
  camera.rotation.y += Math.PI/8
}
function rotateRight(){
  camera.rotation.y -= Math.PI/8
}



function draw() {
  //calls itself every 60 frames -- more smooth that using setTimeOut
  requestAnimationFrame(draw)

  //run the cube
  cube.draw()


  // player.draw()


  // const self = camera.position
  // socket.emit('new-player', {self})
  // socket.on('player-object', (data) => {
  //   newPlayer(data.self)
  // })

  //do the rendering every time this function is called, every frame
  renderer.render(scene, camera)
}
