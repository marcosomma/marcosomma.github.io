import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import 'babylonjs-materials'

const SCALE = new BABYLON.Vector3(10, 10, 10)
export const importLightHouse = (scene) =>
  new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer(
      '/assets/models/',
      `Lighthouse.obj`,
      scene,
      (assets) => {
        assets.addAllToScene()
        let materialsDic = {}
        assets.materials.forEach((material) => {
          let mat = new BABYLON.StandardMaterial(material.name, scene)
          mat.diffuseColor = material.diffuseColor
          mat.emissiveColor = material.emissiveColor
          materialsDic[material.name] = mat
        })

        assets.meshes.forEach((mesh) => {
          let meshMatName = Object.keys(materialsDic).filter(
            (val, i) => mesh.name.indexOf(val) !== -1
          )

          mesh.scaling = SCALE
          mesh.material = materialsDic[meshMatName[0]]
        })

        resolve(assets.meshes)
      }
    )
  })
