import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

const SCALE = new BABYLON.Vector3(.5,.5,.5)
export const importPaperHouse = (fileName, scene, advancedTexture) => 
new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer("/assets/models/", `House_01.obj`, scene, (assets) => {
        assets.addAllToScene()
        let importedPaperHouse=assets.meshes[0]
        importedPaperHouse.scaling = SCALE
        resolve(importedPaperHouse)
    }); 
})