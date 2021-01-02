import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage } from '../GUI/landing'
import { importBrainPart } from '../imports/brain'
import { getNewCamera, getNewLight } from '../helper'

const setBtnListeners = (btnCenterBrain, btnLeftBrain, btnRightBrain, centerBrain, leftBrain, rightBrain) => {

  btnCenterBrain.onPointerEnterObservable.add(() => {
    btnCenterBrain.paddingRight = 15
    btnCenterBrain.color = "#018786"
    btnCenterBrain.text = "Experiences >>>";
    centerBrain.setAlpha(1)
    leftBrain.material.alpha= 0.1
    rightBrain.material.alpha= 0.1
  });
  btnCenterBrain.onPointerOutObservable.add(() => {
    btnCenterBrain.color = "black"
    btnCenterBrain.paddingRight = 10
    btnCenterBrain.text = "Experiences";
    centerBrain.setAlpha(0)
    leftBrain.material.alpha= 1
    rightBrain.material.alpha= 1
  });
  
  btnLeftBrain.onPointerEnterObservable.add(() => {
    btnLeftBrain.paddingRight = 15
    btnLeftBrain.color = "#018786"
    btnLeftBrain.text = "Creativity >>>";
    rightBrain.setAlpha(1)
    centerBrain.material.alpha= 0.1
    leftBrain.material.alpha= 0.1
  })
  btnLeftBrain.onPointerOutObservable.add(() => {
    btnLeftBrain.paddingRight = 10
    btnLeftBrain.color = "black"
    btnLeftBrain.text = "Creativity";
    rightBrain.setAlpha(0)
    centerBrain.material.alpha= 1
    leftBrain.material.alpha= 1
  })

  btnRightBrain.onPointerEnterObservable.add(() => {
    btnRightBrain.paddingRight = 15
    btnRightBrain.color = "#018786"
    btnRightBrain.text = "Programming >>>";
    leftBrain.setAlpha(1)
    centerBrain.material.alpha= 0.1
    rightBrain.material.alpha= 0.1
  });
  btnRightBrain.onPointerOutObservable.add(() => {
    btnRightBrain.paddingRight = 10
    btnRightBrain.color = "black"
    btnRightBrain.text = "Programming";
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
    console.log(values)
    let [centerBrain, leftBrain, rightBrain] = values
    let {btnCenterBrain, btnLeftBrain, btnRightBrain} = getGUILandingPage(advancedTexture)
    setBtnListeners(btnCenterBrain, btnLeftBrain, btnRightBrain, centerBrain, leftBrain, rightBrain)
  
    camera.setPosition(new BABYLON.Vector3(0,5,30))
    camera.setTarget(new BABYLON.Vector3(0,0,0))
  
    container.meshes.push(centerBrain)
    container.meshes.push(leftBrain)
    container.meshes.push(rightBrain)
    container.cameras.push(camera)
    container.lights.push(light)
    // scene.debugLayer.show()
    // container.addAllToScene()
  
    scene.registerBeforeRender(function () {
      camera.alpha += .00075
    })
  
    return scene
  })
}
