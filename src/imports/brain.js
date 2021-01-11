import * as BABYLON from 'babylonjs'
import { getGUIBrainPart } from '../GUI'
import 'babylonjs-loaders'

const SCALE = new BABYLON.Vector3(30, 30, 30)

const getAnimationParams = (fileName) => {
  let params = {
    type: '',
    keys: [{ frame: 0, value: 0 }],
  }
  switch (fileName) {
    case 'CX':
      params.type = 'position.y'
      params.keys.push({
        frame: 50,
        value: -5,
      })
      break
    case 'LX':
      params.type = 'position.x'
      params.keys.push({
        frame: 50,
        value: 5,
      })
      break
    case 'RX':
      params.type = 'position.x'
      params.keys.push({
        frame: 50,
        value: -5,
      })
      break
    default:
      console.log(`No animation params for filename ${fileName}`)
  }
  return params
}
export const importBrainPart = (fileName, scene, advancedTexture) =>
  new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer(
      '/assets/models/',
      `${fileName}.obj`,
      scene,
      (assets) => {
        assets.addAllToScene()
        let importedBrainPart = assets.meshes[0]
        importedBrainPart.scaling = SCALE

        let animationParams = getAnimationParams(fileName)
        let animation = new BABYLON.Animation(
          `${fileName}-animation`,
          animationParams.type,
          50,
          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        )
        animation.setKeys(animationParams.keys)
        importedBrainPart.animations.push(animation)
        scene.beginAnimation(importedBrainPart, 0, 50, false)

        const gUi = getGUIBrainPart(
          fileName,
          importedBrainPart,
          advancedTexture
        )
        importedBrainPart.setAlpha = (value) => {
          gUi.label.alpha = value
          gUi.line.alpha = value
          gUi.endRound.alpha = value
        }

        importedBrainPart.setAlpha(0)
        resolve(importedBrainPart)
      }
    )
  })
