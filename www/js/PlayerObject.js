class PlayerObject {
  constructor() {
    this.mesh // thing that becomes the cube
    this.setup(scene)
    // "this" references the whole class, or whatever its scale is
  }


  setup(scene){
   
    //*****GLTF*****

    // const loader = new THREE.GLTFLoader().setPath('path/to')
    // loader.load('model.gltf',  (gltf) => {
    //   scene.add(gltf.scene)
    //
    // })

//******CONE PLACEHOLDER*****
    const geo = new THREE.ConeBufferGeometry(6,8,16)
    const mat = new THREE.MeshNormalMaterial()
    this.mesh = new THREE.Mesh(geo, mat)
    scene.add(this.mesh)
    this.mesh.rotation.y = Math.PI / 4
    this.mesh.rotation.x = Math.PI / 16
  }

  draw() {
    this.mesh.rotation.y += .01
    this.mesh.position.set(camera.position.x,camera.position.y,camera.position.z)

  }
}


//------- good practice --------
//--- make each object in the scene have its own class?
//--- where the animations/actions of the object exist too
//--- it helps organize?
