import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { importCenterBrain, importLeftBrain, importRightBrain } from '../imports/brain'
import { getNewCamera, getNewLight } from '../helper'

let nodes = []

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
  const centerBrain = importCenterBrain(scene)
  const leftBrain = importLeftBrain(scene)
  const rightBrain = importRightBrain(scene)
  // const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI( 'LandingUi' )
  let startRotation = false
  
  camera.setPosition(new BABYLON.Vector3(0,30,30))
  camera.setTarget(new BABYLON.Vector3(0,0,0))

  container.meshes.push(centerBrain)
  container.meshes.push(leftBrain)
  container.meshes.push(rightBrain)
  container.cameras.push(camera)
  container.lights.push(light)
  // scene.debugLayer.show()

  setTimeout(()=>{
    startRotation = true
  }, 2250)
  scene.registerBeforeRender(function () {
    if(startRotation) camera.alpha += .005
  })

  return scene
}
