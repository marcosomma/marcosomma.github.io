import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

const SCALE = new BABYLON.Vector3(10, 10, 10)
export const importDesk = (scene) =>
  new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer('/assets/models/', `Desk.obj`, scene, (assets) => {
      assets.addAllToScene()

      // let env = scene.createDefaultEnvironment()
      // env.skybox.scaling = SCALE
      // env.ground.scaling = SCALE
      // env.skyboxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)
      // env.groundMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)
      // env.ground.scaling = SCALE
      // console.log('env', env)

      assets.meshes.forEach((mesh) => {
        mesh.scaling = SCALE
        mesh.isPickable = false
      })
      resolve(assets.meshes)
    })
  })
