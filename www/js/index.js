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

  light = new THREE.DirectionalLight(0x9cf2ff, 10000)
  light.position.set( 2, 2, 2 )
  light.rotation.set( Math.PI/2, 2, 2 )
  scene.add(light)


  //controls
  var keyMap = [];

  window.addEventListener('keydown', (e)=>{
      if(!keyMap.includes(e.keyCode)){
          keyMap.push(e.keyCode);
      }
      checkGameKeys()
  })
  window.addEventListener('keyup', (e)=>{
      if(keyMap.includes(e.keyCode)){
          keyMap.splice(keyMap.indexOf(e.keyCode), 1);
      }
      checkGameKeys()
      console.log(e.keyCode)

  })
  function key(x){
      return (keyMap.includes(x));
  }

  function checkGameKeys(){
      if(key(37)){
          camera.rotation.y += Math.PI/8
      }
      if(key(39)){
          camera.rotation.y -= Math.PI/8
      }
      if(key(65)){
          camera.translateX(-1)
      }
      if(key(68)){
          camera.translateX(1)
      }
      if(key(87)){
          camera.translateZ(-1)
      }
      if(key(83)){
          camera.translateZ(1)
      }
      if(key(32)){
          camera.position.y += 1
      }
      if(key(16)){
          camera.position.y -= 1
      }
  }

            //   window.addEventListener('keydown', () => {
            //
            //     // console.log(event.keyCode)
            //   if (event.keyCode === 87){
            //     moveForward()
            //   } else if (event.keyCode === 83) {
            //     moveBackward()
            //   } else if (event.keyCode === 65) {
            //     moveLeft()
            //   } else if (event.keyCode === 68) {
            //     moveRight()
            //   }
            //   })
            // window.addEventListener('keydown', () => {
            //   if (event.keyCode === 37) {
            //       rotateLeft()
            //   } else if (event.keyCode === 39) {
            //       rotateRight()
            //     }
            // })



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


              //
              // function moveForward(){
              //   camera.translateZ(-1)
              // }
              // function moveBackward(){
              //   camera.translateZ(1)
              // }
              // function moveLeft(){
              //   camera.translateX(-1)
              // }
              // function moveRight(){
              //   camera.translateX(1)
              // }
              //
              // function rotateLeft(){
              //   camera.rotation.y += Math.PI/8
              // }
              // function rotateRight(){
              //   camera.rotation.y -= Math.PI/8
              // }



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
