import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
export const importRobot = ( scene ) => 
new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer("/assets/models/", `Robot.obj`, scene, (assets) => {
        assets.addAllToScene()
        assets.meshes.forEach(mesh => {
            mesh.scaling = new BABYLON.Vector3(.01,.01,.01)
        });
        resolve(assets.meshes)
    }); 
})