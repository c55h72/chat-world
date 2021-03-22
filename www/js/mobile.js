import * as THREE from '../build/three.module.js';
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from '../jsm/controls/PointerLockControls.js';

let controls, renderer, scene, camera
let player
let raycaster
const objects = [];
let myself
let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false
let canJump = false

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();






setup()
draw()

function setup(){
  //create scene and camera
  scene = new THREE.Scene()
  const ar = innerWidth / innerHeight
  camera =  new THREE.PerspectiveCamera(75, ar, 0.1, 1000)

  //move camera away from origin
  camera.position.set(1,1,10)


  const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
  light.position.set( 0.5, 1, 0.75 );
  scene.add( light );




// ~~~~~~~~~~~CONTROLS~~~~~~~~~~~

  // controls = new PointerLockControls( camera, document.body );
  //
  // 				const blocker = document.getElementById( 'blocker' );
  // 				const instructions = document.getElementById( 'instructions' );
  //
  // 				instructions.addEventListener( 'click', function () {
  //
  // 					controls.lock();
  //
  // 				} );
  //
  // 				controls.addEventListener( 'lock', function () {
  //
  // 					instructions.style.display = 'none';
  // 					blocker.style.display = 'none';
  //
  // 				} );
  //
  // 				controls.addEventListener( 'unlock', function () {
  //
  // 					blocker.style.display = 'block';
  // 					instructions.style.display = '';
  //
  // 				} );
  //
  // 				scene.add( controls.getObject() );
  //
  // 				const onKeyDown = function ( event ) {
  //
  // 					switch ( event.code ) {
  //
  // 						case 'ArrowUp':
  // 						case 'KeyW':
  // 							moveForward = true;
  // 							break;
  //
  // 						case 'ArrowLeft':
  // 						case 'KeyA':
  // 							moveLeft = true;
  // 							break;
  //
  // 						case 'ArrowDown':
  // 						case 'KeyS':
  // 							moveBackward = true;
  // 							break;
  //
  // 						case 'ArrowRight':
  // 						case 'KeyD':
  // 							moveRight = true;
  // 							break;
  //
  // 						case 'Space':
  // 							if ( canJump === true ) velocity.y += 350;
  // 							canJump = false;
  // 							break;
  //
  // 					}
  //
  // 				};
  //
  // 				const onKeyUp = function ( event ) {
  //
  // 					switch ( event.code ) {
  //
  // 						case 'ArrowUp':
  // 						case 'KeyW':
  // 							moveForward = false;
  // 							break;
  //
  // 						case 'ArrowLeft':
  // 						case 'KeyA':
  // 							moveLeft = false;
  // 							break;
  //
  // 						case 'ArrowDown':
  // 						case 'KeyS':
  // 							moveBackward = false;
  // 							break;
  //
  // 						case 'ArrowRight':
  // 						case 'KeyD':
  // 							moveRight = false;
  // 							break;
  // 					}
  // 				};
  // 				document.addEventListener( 'keydown', onKeyDown );
  // 				document.addEventListener( 'keyup', onKeyUp );
  // 				raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
  //

// ~~~~~~~~~END CONTROLS~~~~~~~~~


//green ground plane

  // const ground = new THREE.Mesh(
  //   new THREE.PlaneGeometry(100,100,10,10),
  //   new THREE.MeshNormalMaterial())
  // ground.rotation.x = - Math.PI / 2 // rotates X/Y to X/Z
  // scene.add( ground )
  // ground.position.set(myself)


//box.position.set(myself)

//this makes the terrain / loads all the meshes

const loader = new GLTFLoader().setPath('assets/landscape5/')
loader.load('landscape5.gltf', (gltf) => {
  const mat = new THREE.MeshNormalMaterial()
  gltf.scene.traverse((child) =>{
    if (child.isMesh) {
    //  child.material = mat
      objects.push(child)
    }
  })
  scene.add(gltf.scene)
  //gltf.scene.position.y = 10
  gltf.scene.scale.set(100,100,100)
  // objects.push(gltf.scene)
})
const loader2 = new GLTFLoader().setPath('assets/snake1/')
loader2.load('snake1.gltf', (gltf) => {
  const mat = new THREE.MeshNormalMaterial()
  gltf.scene.traverse((child) =>{
    if (child.isMesh) {
    //  child.material = mat
      objects.push(child)
    }
  })
  scene.add(gltf.scene)
  //gltf.scene.position.y = 10
  gltf.scene.scale.set(100,100,100)
  // objects.push(gltf.scene)
})


  //set up renderer
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

function draw() {

  requestAnimationFrame(draw)

// ~~~~~~~~CONTROLS~~~~~~~~~

  // const time = performance.now();
	// if ( controls.isLocked === true ) {
	// 	raycaster.ray.origin.copy( controls.getObject().position );
	// 	raycaster.ray.origin.y -= 10;
  //
	// 	const intersections = raycaster.intersectObjects( objects );
  //
	// 	const onObject = intersections.length > 0;
  //
	// 	const delta = ( time - prevTime ) / 1000;
  //
	// 	velocity.x -= velocity.x * 10.0 * delta;
	// 	velocity.z -= velocity.z * 10.0 * delta;
  //
	// 	velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
  //
	// 	direction.z = Number( moveForward ) - Number( moveBackward );
	// 	direction.x = Number( moveRight ) - Number( moveLeft );
	// 	direction.normalize(); // this ensures consistent movements in all directions
  //
	// 	if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
	// 	if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
  //
	// 	if ( onObject === true ) {
  //
	// 		velocity.y = Math.max( 0, velocity.y );
	// 		canJump = true;
  //
	// 	}
  //
	// 	controls.moveRight( - velocity.x * delta );
	// 	controls.moveForward( - velocity.z * delta );
  //
	// 	controls.getObject().position.y += ( velocity.y * delta ); // new behavior
  //
	// 	if ( controls.getObject().position.y < 10 ) {
  //
	// 		velocity.y = 0;
	// 		controls.getObject().position.y = 10;
  //
	// 		canJump = true;
  //
	// 	}
  //
	// }
  //
	// prevTime = time;

//~~~~~~~~~~~END CONTROLS~~~~~~~~~~

  // player.draw()


  //myself = camera.position


  // socket.emit('new-player', {myself})
  // socket.on('player-object', (data) => {
  //   newPlayer(data.self)
  // })


  //do the rendering every time this function is called, every frame
  renderer.render(scene, camera)

}
