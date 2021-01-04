import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage } from '../GUI/landing'
import { importBrainPart } from '../imports/brain'
import { getNewCamera, getNewLight } from '../common/helper'
BABYLON.Logger.LogLevels = 3

let selected = undefined
let onPointerEnterObservableOldListener = []
let onPointerOutObservableOldListener = []

const setBtnListeners = (btnCenterBrain, btnLeftBrain, btnRightBrain, back, centerBrain, leftBrain, rightBrain, camera) => {
  btnCenterBrain.onPointerEnterObservable.add(() => {
    if(selected) return
    btnCenterBrain.color = "#018786"
    centerBrain.setAlpha(1)
    leftBrain.material.alpha= 0.1
    rightBrain.material.alpha= 0.1
  });
  btnCenterBrain.onPointerOutObservable.add(() => {
    if(selected) return
    btnCenterBrain.color = "black"
    centerBrain.setAlpha(0)
    leftBrain.material.alpha= 1
    rightBrain.material.alpha= 1
  });
  btnCenterBrain.onPointerClickObservable.add(() => {
    if(selected) return
    selected = btnCenterBrain
    btnCenterBrain.color = "#018786"
    centerBrain.setAlpha(0)
    centerBrain.material.alpha= 0
    leftBrain.material.alpha= 0
    rightBrain.material.alpha= 0
    btnLeftBrain.color = '#c2c2c2'
    btnRightBrain.color = '#c2c2c2'
    btnCenterBrain.isPickable = false
    btnRightBrain.isPickable = false
    btnLeftBrain.isPickable = false
    back.color = 'black'
  });
  
  btnLeftBrain.onPointerEnterObservable.add(() => {
    if(selected) return
    btnLeftBrain.color = "#018786"
    rightBrain.setAlpha(1)
    centerBrain.material.alpha= 0.1
    leftBrain.material.alpha= 0.1
  })
  btnLeftBrain.onPointerOutObservable.add(() => {
    if(selected) return
    btnLeftBrain.color = "black"
    rightBrain.setAlpha(0)
    centerBrain.material.alpha= 1
    leftBrain.material.alpha= 1
  })
  btnLeftBrain.onPointerClickObservable.add(() => {
    if(selected) return
    selected = btnLeftBrain
    btnLeftBrain.color = "#018786"
    rightBrain.setAlpha(0)
    centerBrain.material.alpha= 0
    leftBrain.material.alpha= 0
    rightBrain.material.alpha= 0
    btnCenterBrain.color = '#c2c2c2'
    btnRightBrain.color = '#c2c2c2'
    btnCenterBrain.isPickable = false
    btnRightBrain.isPickable = false
    btnLeftBrain.isPickable = false
    back.color = 'black'
  });

  btnRightBrain.onPointerEnterObservable.add(() => {
    if(selected) return
    btnRightBrain.color = "#018786"
    leftBrain.setAlpha(1)
    centerBrain.material.alpha= 0.1
    rightBrain.material.alpha= 0.1
  });
  btnRightBrain.onPointerOutObservable.add(() => {
    if(selected) return
    btnRightBrain.color = "black"
    leftBrain.setAlpha(0)
    centerBrain.material.alpha= 1
    rightBrain.material.alpha= 1
  });
  btnRightBrain.onPointerClickObservable.add(() => {
    if(selected) return
    selected = btnRightBrain
    btnRightBrain.color = "#018786"
    leftBrain.setAlpha(0)
    centerBrain.material.alpha= 0
    leftBrain.material.alpha= 0
    rightBrain.material.alpha= 0
    btnCenterBrain.color = '#c2c2c2'
    btnLeftBrain.color = '#c2c2c2'
    btnCenterBrain.isPickable = false
    btnRightBrain.isPickable = false
    btnLeftBrain.isPickable = false
    back.color = 'black'
  });
  back.onPointerClickObservable.add(() => {
    if(!selected) return
    btnCenterBrain.color = 'black'
    btnRightBrain.color = 'black'
    btnLeftBrain.color = 'black'
    centerBrain.material.alpha= 1
    leftBrain.material.alpha= 1
    rightBrain.material.alpha= 1
    btnCenterBrain.isPickable = true
    btnRightBrain.isPickable = true
    btnLeftBrain.isPickable = true
    selected = undefined
    back.color = 'transparent'
  });
}

export const Create = (
  engine,
  scene,
  canvas,
  container,
  report,
  space_size
) => {
  const camera = getNewCamera('mainCamera', scene, canvas, space_size)
  const light = getNewLight('mainLight', scene)
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI( 'LandingUi' )

  Promise.all([
    importBrainPart('CX', scene, advancedTexture), 
    importBrainPart('RX', scene, advancedTexture), 
    importBrainPart('LX', scene, advancedTexture)
  ]).then((values)=>{
    let [centerBrain, leftBrain, rightBrain] = values
    let {btnCenterBrain, btnLeftBrain, btnRightBrain, back} = getGUILandingPage(advancedTexture)
    setBtnListeners(btnCenterBrain, btnLeftBrain, btnRightBrain, back, centerBrain, leftBrain, rightBrain, camera)
  
    camera.setPosition(new BABYLON.Vector3(0,5,30))
    camera.setTarget(new BABYLON.Vector3(0,0,0))
  
    container.meshes.push(centerBrain)
    container.meshes.push(leftBrain)
    container.meshes.push(rightBrain)
    container.cameras.push(camera)
    container.lights.push(light)
  
    scene.registerBeforeRender(function () {
      camera.alpha += .00075
    })
  
    return scene
  })
}
