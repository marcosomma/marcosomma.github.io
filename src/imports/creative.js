import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

const SCALE = new BABYLON.Vector3(50, 50, 50)
export const importCreative = (scene) =>
  new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer('/assets/models/', `Creativity.obj`, scene, (assets) => {
      assets.addAllToScene()
      assets.meshes.forEach((mesh) => {
        mesh.rotation.y = -Math.PI / 2
      })
      resolve(assets.meshes)
    })
  })
