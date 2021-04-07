import * as THREE from '../build/three.module.js';
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js';

let x, y, z
let player

class Player {
  constructor (scene, camera) {
    this.mesh
    this.setup(scene, camera, player)
    this.update(scene, camera, player)
  }

  setup (scene, camera, player) {
    const loader = new GLTFLoader().setPath('../assets/snake1/')
    loader.load('snake1.gltf', (gltf) => {
      const player = gltf.scene
      player.scale.set(100,100,100)
      this.mesh = player
      scene.add(player)
      x = camera.position.x
      y = camera.position.y
      z = camera.position.z
      player.position.set(x, y, z)
    })
  }

  update (camera) {
    x = camera.position.x
    y = camera.position.y
    z = camera.position.z
    //this.mesh.position.set(x, y, z)
    }

}

export { Player }
