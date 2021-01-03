import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage } from '../GUI/landing'
import { importBrainPart } from '../imports/brain'
import { getNewCamera, getNewLight } from '../common/helper'

let onPointerEnterObservableOldListener = []
let onPointerOutObservableOldListener = []

const setBtnListeners = (btnCenterBrain, btnLeftBrain, btnRightBrain, centerBrain, leftBrain, rightBrain, camera) => {
  btnCenterBrain.onPointerEnterObservable.add(() => {
    btnCenterBrain.color = "#018786"
    centerBrain.setAlpha(1)
    leftBrain.material.alpha= 0.1
    rightBrain.material.alpha= 0.1
  });
  btnCenterBrain.onPointerOutObservable.add(() => {
    btnCenterBrain.color = "black"
    centerBrain.setAlpha(0)
    leftBrain.material.alpha= 1
    rightBrain.material.alpha= 1
  });
  btnCenterBrain.onPointerClickObservable.add(() => {
    btnCenterBrain.color = "#018786"
    centerBrain.setAlpha(0)
    leftBrain.material.alpha= 0
    rightBrain.material.alpha= 0
    camera.setPosition(new BABYLON.Vector3(0,5,50))
    camera.setTarget(centerBrain)
    btnLeftBrain.color = 'grey'
    btnRightBrain.color = 'grey'
    btnLeftBrain.isPickable = false
    btnRightBrain.isPickable = false
    onPointerEnterObservableOldListener = btnCenterBrain.onPointerEnterObservable
    onPointerOutObservableOldListener = btnCenterBrain.onPointerOutObservable
    btnCenterBrain.onPointerEnterObservable = []
    btnCenterBrain.onPointerOutObservable = []
  });
  
  btnLeftBrain.onPointerEnterObservable.add(() => {
    btnLeftBrain.color = "#018786"
    rightBrain.setAlpha(1)
    centerBrain.material.alpha= 0.1
    leftBrain.material.alpha= 0.1
  })
  btnLeftBrain.onPointerOutObservable.add(() => {
    btnLeftBrain.color = "black"
    rightBrain.setAlpha(0)
    centerBrain.material.alpha= 1
    leftBrain.material.alpha= 1
  })
  btnLeftBrain.onPointerClickObservable.add(() => {
    btnLeftBrain.color = "#018786"
    rightBrain.setAlpha(0)
    centerBrain.material.alpha= 0
    leftBrain.material.alpha= 0
    camera.setPosition(new BABYLON.Vector3(-20,5,50))
    camera.setTarget(rightBrain)
    btnCenterBrain.color = 'grey'
    btnRightBrain.color = 'grey'
    btnCenterBrain.isPickable = false
    btnRightBrain.isPickable = false
    onPointerEnterObservableOldListener = btnLeftBrain.onPointerEnterObservable
    onPointerOutObservableOldListener = btnLeftBrain.onPointerOutObservable
    btnLeftBrain.onPointerEnterObservable = []
    btnLeftBrain.onPointerOutObservable = []
  });

  btnRightBrain.onPointerEnterObservable.add(() => {
    btnRightBrain.color = "#018786"
    leftBrain.setAlpha(1)
    centerBrain.material.alpha= 0.1
    rightBrain.material.alpha= 0.1
  });
  btnRightBrain.onPointerOutObservable.add(() => {
    btnRightBrain.color = "black"
    leftBrain.setAlpha(0)
    centerBrain.material.alpha= 1
    rightBrain.material.alpha= 1
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
    let {btnCenterBrain, btnLeftBrain, btnRightBrain} = getGUILandingPage(advancedTexture)
    setBtnListeners(btnCenterBrain, btnLeftBrain, btnRightBrain, centerBrain, leftBrain, rightBrain, camera)
  
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
