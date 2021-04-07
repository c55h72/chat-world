import * as THREE from '../build/three.module.js';
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js';

class Snake {
  constructor (scene) {
    this.mesh
    this.setup(scene)

  }

  setup (scene) {
    const loader = new GLTFLoader().setPath('../assets/snake1/')
    loader.load('snake1.gltf', (gltf) => {
      const snake = gltf.scene
      snake.scale.set(100,100,100)
      scene.add(snake)
      this.mesh = snake
     this.setupEventListener()
    })
  }

  setupEventListener(){
    document.addEventListener('mousemove', (e) => {
     const y = THREE.Math.mapLinear(e.clientX, 0, innerWidth, -.2, 2)
      this.mesh.rotation.y = y
     const x = THREE.Math.mapLinear(e.clientY, 0, innerWidth, -.2, 2)
      this.mesh.rotation.x = x
    })
  }

}

export { Snake }
