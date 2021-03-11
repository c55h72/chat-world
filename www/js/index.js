let controls, renderer, scene, camera
let cube
let player


const objects = [];

			let raycaster;

			let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;
			let canJump = false;

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


  //light
  // light = new THREE.DirectionalLight(0xffffff, 0.5)
  // light.position.set( 2, 2, 2 )
  // light.rotation.set( Math.PI/2, 2, 2 )
  // scene.add(light)

  // const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
  // light.position.set( 0.5, 1, 0.75 );
  // scene.add( light );

  //pointerlock

  controls = new THREE.PointerLockControls( camera, document.body );

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

				// floor

				let floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
				floorGeometry.rotateX( - Math.PI / 2 );

				// vertex displacement

				let position = floorGeometry.attributes.position;

				for ( let i = 0, l = position.count; i < l; i ++ ) {

					vertex.fromBufferAttribute( position, i );

					vertex.x += Math.random() * 20 - 10;
					vertex.y += Math.random() * 2;
					vertex.z += Math.random() * 20 - 10;

					position.setXYZ( i, vertex.x, vertex.y, vertex.z );

				}

				floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

				position = floorGeometry.attributes.position;
				const colorsFloor = [];

				for ( let i = 0, l = position.count; i < l; i ++ ) {

					color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					colorsFloor.push( color.r, color.g, color.b );

				}

				floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

				const floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

				const floor = new THREE.Mesh( floorGeometry, floorMaterial );
				scene.add( floor );

				// objects

				const boxGeometry = new THREE.BoxGeometry( 20, 20, 20 ).toNonIndexed();

				position = boxGeometry.attributes.position;
				const colorsBox = [];

				for ( let i = 0, l = position.count; i < l; i ++ ) {

					color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					colorsBox.push( color.r, color.g, color.b );

				}

				boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsBox, 3 ) );

				for ( let i = 0; i < 500; i ++ ) {

					const boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
					boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

					const box = new THREE.Mesh( boxGeometry, boxMaterial );
					box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
					box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
					box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

					scene.add( box );
					objects.push( box );

				}


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





function draw() {
  //calls itself every 60 frames -- more smooth that using setTimeOut
  requestAnimationFrame(draw)

  //run the cube
  cube.draw()



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


  // player.draw()


  // const self = camera.position
  // socket.emit('new-player', {self})
  // socket.on('player-object', (data) => {
  //   newPlayer(data.self)
  // })

  //do the rendering every time this function is called, every frame
  renderer.render(scene, camera)
}
