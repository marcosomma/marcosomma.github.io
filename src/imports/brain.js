import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

export const importCenterBrain = (scene) => {
    let centerBrain
    BABYLON.SceneLoader.LoadAssetContainer("/assets/models/", "CX.obj", scene, (assets) => {
        assets.addAllToScene()
        centerBrain=assets.meshes[0]
        centerBrain.scaling = new BABYLON.Vector3(30,30,30)

        let animationCenterBrainEnter = new BABYLON.Animation("animationCenterBrainEnter", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        let animationCenterBrainEnterKeys = []
        animationCenterBrainEnterKeys.push({
        frame: 0,
        value: 0
        });
        animationCenterBrainEnterKeys.push({
        frame: 50,
        value: -7.5
        });
        animationCenterBrainEnter.setKeys(animationCenterBrainEnterKeys)
        centerBrain.animations.push(animationCenterBrainEnter)
        scene.beginAnimation(centerBrain, 0, 50, false)
        return centerBrain
    }); 
}
export const importLeftBrain = (scene) => {
    let leftBrain
    BABYLON.SceneLoader.LoadAssetContainer("/assets/models/", "LX.obj", scene, (assets) => {
        assets.addAllToScene()
        leftBrain=assets.meshes[0]
        leftBrain.scaling = new BABYLON.Vector3(30,30,30)

        let animationLeftBrainEnter = new BABYLON.Animation("animationLeftBrainEnter", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        let animationLeftBrainEnterKeys = []
        animationLeftBrainEnterKeys.push({
            frame: 0,
            value: 0
        });
        animationLeftBrainEnterKeys.push({
            frame: 50,
            value: 7.5
        });
        animationLeftBrainEnter.setKeys(animationLeftBrainEnterKeys)
        leftBrain.animations.push(animationLeftBrainEnter)
        scene.beginAnimation(leftBrain, 0, 50, false)
        return leftBrain
    }); 
}
export const importRightBrain = (scene) => {
    let rightBrain
    BABYLON.SceneLoader.LoadAssetContainer("/assets/models/", "RX.obj", scene, (assets) => {
        assets.addAllToScene()
        rightBrain=assets.meshes[0]
        rightBrain.scaling = new BABYLON.Vector3(30,30,30)
    
        let animationRightBrainEnter = new BABYLON.Animation("animationRightBrainEnter", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        let animationRightBrainEnterKeys = []
        animationRightBrainEnterKeys.push({
          frame: 0,
          value: 0
        });
        animationRightBrainEnterKeys.push({
          frame: 50,
          value: -7.5
        });
        animationRightBrainEnter.setKeys(animationRightBrainEnterKeys)
        rightBrain.animations.push(animationRightBrainEnter)
        scene.beginAnimation(rightBrain, 0, 50, false)
        return rightBrain
    }); 
}