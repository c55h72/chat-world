class Controls {
  constructor() {
    this.setup(scene, controls, camera, renderer)
  }

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

  setup(scene, controls, camera, renderer) {
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

  }
}
