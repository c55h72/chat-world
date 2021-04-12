import * as THREE from '../build/three.module.js';
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from '../jsm/controls/PointerLockControls.js';
import { Snake } from './Snake.js'
import { Player } from './Player.js'

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

let loader, loader2, loader3, loader4, loader5, loader6
let water, greenland, mushrooms, caves, snake, cliffs

let isMobile = false; //initiate as false


// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {

    isMobile = true;
}
if (isMobile === true){
  window.location = "mobile.html"
}



setup()
draw()

function setup(){
  //create scene and camera
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x9ad1ff)
  const ar = innerWidth / innerHeight
  camera =  new THREE.PerspectiveCamera(75, ar, 0.1, 5000)

  //move camera away from origin
  camera.position.set(1,1,10)


  const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 2 );
  light.position.set( 0.5, 1, 0.75 );
  scene.add( light );

  const color = 0x9ad1ff
  const density = 0.001
  scene.fog = new THREE.FogExp2(color, density)



// ~~~~~~~~~~~CONTROLS~~~~~~~~~~~

  controls = new PointerLockControls( camera, document.body );

  				const blocker = document.getElementById( 'blocker' );
  				const instructions = document.getElementById( 'instructions' );
  				instructions.addEventListener( 'click', function () {
  					controls.lock();
  				} );
  				controls.addEventListener( 'lock', function () {
  					instructions.style.display = 'none';
  					blocker.style.display = 'none';
  				} );
  				controls.addEventListener( 'unlock', function () {
  					blocker.style.display = 'block';
  					instructions.style.display = '';
  				} );
  				scene.add( controls.getObject() );
  				const onKeyDown = function ( event ) {
  					switch ( event.code ) {
  						case 'ArrowUp':
  						case 'KeyW':
  							moveForward = true;
  							break;
  						case 'ArrowLeft':
  						case 'KeyA':
  							moveLeft = true;
  							break;
  						case 'ArrowDown':
  						case 'KeyS':
  							moveBackward = true;
  							break;
  						case 'ArrowRight':
  						case 'KeyD':
  							moveRight = true;
  							break;
  						case 'Space':
  							if ( canJump === true ) velocity.y += 350;
  							canJump = false;
  							break;
  					}
  				};
  				const onKeyUp = function ( event ) {
  					switch ( event.code ) {
  						case 'ArrowUp':
  						case 'KeyW':
  							moveForward = false;
  							break;
  						case 'ArrowLeft':
  						case 'KeyA':
  							moveLeft = false;
  							break;
  						case 'ArrowDown':
  						case 'KeyS':
  							moveBackward = false;
  							break;
  						case 'ArrowRight':
  						case 'KeyD':
  							moveRight = false;
  							break;
  					}
  				};
  				document.addEventListener( 'keydown', onKeyDown );
  				document.addEventListener( 'keyup', onKeyUp );
  				raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

  // ~~~~~~~~~END CONTROLS~~~~~~~~~

//skybox / video

// const container = document.getElementById( 'container' );
// const geometry = new THREE.SphereGeometry( 1000, 120, 80 );
// 				// invert the geometry on the x-axis so that all of the faces point inward
// 				geometry.scale( - 1, 1, 1 );
//
// 				const video = document.getElementById( 'video' );
// 				video.play();
//
// 				const texture = new THREE.VideoTexture( video );
// 				const material = new THREE.MeshBasicMaterial( { map: texture } );
//
// 				const mesh = new THREE.Mesh( geometry, material );
// 				scene.add( mesh );


  //this makes the terrain / loads all the meshes

  loader = new GLTFLoader().setPath('assets/greenland2/')
  loader.load('greenland2.gltf', (gltf) => {
    scene.add(gltf.scene)
    gltf.scene.scale.set(100,100,100)
    gltf.scene.traverse((child) =>{
    if (child.isMesh) {
      objects.push(child)
      const loader = new THREE.TextureLoader()
      child.material = new THREE.MeshBasicMaterial({
        map: loader.load('assets/imgs/clay.jpg'),
        side: THREE.DoubleSide
      })
    }})
    window.greenland = gltf.scene
  })

  loader2 = new GLTFLoader().setPath('assets/water/')
  loader2.load('water.gltf', (gltf) => {
    scene.add(gltf.scene)
    gltf.scene.scale.set(100,100,100)
    gltf.scene.traverse((child) =>{
      if (child.isMesh) {
      objects.push(child)
      window.water = child

    }})
  })

  loader3 = new GLTFLoader().setPath('assets/caves2/')
  loader3.load('caves2.gltf', (gltf) => {
    scene.add(gltf.scene)
    gltf.scene.scale.set(100,100,100)
    gltf.scene.traverse((child) =>{
      if (child.isMesh) {
      objects.push(child)
    }})
    window.caves = gltf.scene
  })

  loader4 = new GLTFLoader().setPath('assets/cliffs2/')
  loader4.load('cliffs2.gltf', (gltf) => {
    scene.add(gltf.scene)
    gltf.scene.scale.set(100,100,100)
    gltf.scene.traverse((child) =>{
      if (child.isMesh) {
      objects.push(child)
    }})
    window.cliffs = gltf.scene
  })

  loader6= new GLTFLoader().setPath('assets/mush2/')
  loader6.load('mush2.gltf', (gltf) => {
    scene.add(gltf.scene)
    gltf.scene.scale.set(100,100,100)
    gltf.scene.traverse((child) =>{
      if (child.isMesh) {
      objects.push(child)
    }})
    window.mushrooms = gltf.scene
  })






  // loader5= new GLTFLoader().setPath('assets/snake1/')
  // loader5.load('snake1.gltf', (gltf) => {
  //   scene.add(gltf.scene)
  //   gltf.scene.scale.set(100,100,100)
  //   objects.push(gltf.scene)
  //   snake = gltf.scene
  // })

//  snake = new Snake(scene)

//  player = new Player(scene, camera)

//  snake.rotation.y = 2

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

  const time = performance.now();
	if ( controls.isLocked === true ) {
		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;
		const intersections = raycaster.intersectObjects( objects );
		const onObject = intersections.length > 0;
		const delta = ( time - prevTime ) / 1000;
		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;
		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions
		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
		if ( onObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
			canJump = true;
		}
		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );
		controls.getObject().position.y += ( velocity.y * delta ); // new behavior
		if ( controls.getObject().position.y < 10 ) {
			velocity.y = 0;
			controls.getObject().position.y = 10;
			canJump = true;
		}
	}
	prevTime = time;

//~~~~~~~~~~~END CONTROLS~~~~~~~~~~


  //snake.traverse()
  //snake.mesh.rotation.x += 1

//console.log(camera.position)

//  player.update(camera)

  renderer.render(scene, camera)

}


console.log(scene)
console.log(snake)
function cliffRotate() {
window.cliffs.rotation.x += 1
}

setInterval(cliffRotate, 1000)
