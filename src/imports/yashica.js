import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

export const importYashica = ( scene ) => 
new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer("/assets/models/", `miCamera.obj`, scene, (assets) => {
        assets.addAllToScene()

        let yashicaMat = new BABYLON.StandardMaterial("yashicaMat", scene)
        yashicaMat.reflectionTexture= new BABYLON.Texture('/assets/models/yashica/Yashica_reflection_2.png', scene)
        yashicaMat.diffuseTexture = new BABYLON.Texture('/assets/models/yashica/Yashica_diffuse_2.png', scene)
        yashicaMat.emissiveTexture = new BABYLON.Texture('/assets/models/yashica/Yashica_glossiness_2.png', scene)
        yashicaMat.diffuseTexture.hasAlpha = true
        yashicaMat.backFaceCulling = false

        assets.meshes.forEach(mesh => {
            mesh.material = yashicaMat
            mesh.scaling = new BABYLON.Vector3(.015,.015,.015)
            mesh.rotate(BABYLON.Axis.Y,  Math.PI , BABYLON.Space.LOCAL)
        });
        resolve(assets.meshes)
    }); 
})