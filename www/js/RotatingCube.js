class RotatingCube {
  constructor() {
    this.mesh // thing that becomes the cube
    this.setup(scene)
    // "this" references the whole class, or whatever its scale is
  }


  setup(scene){
    const geo = new THREE.BoxGeometry(1,1,1)
    const mat = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(geo, mat)
    scene.add(this.mesh)
    this.mesh.rotation.y = Math.PI / 4
    this.mesh.rotation.x = Math.PI / 16
  }

  draw() {
    this.mesh.rotation.y += .01
  }
}


//------- good practice --------
//--- make each object in the scene have its own class?
//--- where the animations/actions of the object exist too
//--- it helps organize?
