let terrainScene
let decoScene

class TerrainGen {

  constructor(scene) {
    this.setup(scene);

  }


   setup(scene) {

      const xS = 63, yS = 63;
      terrainScene = THREE.Terrain({
          easing: THREE.Terrain.Linear,
          frequency: 2.5,
          heightmap: THREE.Terrain.DiamondSquare,
          material: new THREE.MeshBasicMaterial({color: 0x5566aa}),
          maxHeight: 100,
          minHeight: -100,
          steps: 1,
          useBufferGeometry: false,
          xSegments: xS,
          xSize: 1024,
          ySegments: yS,
          ySize: 1024,
      });
      // Assuming you already have your global scene, add the terrain to it
      scene.add(terrainScene);

      // Optional:
      // Get the geometry of the terrain across which you want to scatter meshes
      var geo = terrainScene.children[0].geometry;


      // Add randomly distributed foliage
      decoScene = THREE.Terrain.ScatterMeshes(geo, {
          mesh: new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 12, 6)),
          w: xS,
          h: yS,
          spread: 0.02,
          randomness: Math.random,
      });
      terrainScene.add(decoScene);
  }

}
