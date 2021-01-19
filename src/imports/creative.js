import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
export const importCreative = (scene) =>
  new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer('/assets/models/', `creative_2.obj`, scene, (assets) => {
      assets.addAllToScene()
      resolve(assets.meshes)
    })
  })
