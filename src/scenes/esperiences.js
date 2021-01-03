import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage } from '../GUI/landing'
import { importPaperHouse } from '../imports/paperHouse'
import { getNewCamera, getNewLight } from '../common/helper'


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
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI( 'ExperiencesUi' )

  importPaperHouse().then((paperHouse)=>{
    console.log(paperHouse)
    paperHouse.position = new BABYLON.Vector3(-22,-100,-10)
    let {btnCenterBrain, btnLeftBrain, btnRightBrain} = getGUILandingPage(advancedTexture)
    btnCenterBrain.dispose()
    btnLeftBrain.dispose()
    btnRightBrain.dispose()
  
    camera.setPosition(new BABYLON.Vector3(0,5,30))
    camera.setTarget(new BABYLON.Vector3(0,0,0))
  
    container.meshes.push(paperHouse)
    container.cameras.push(camera)
    container.lights.push(light)
  
    scene.registerBeforeRender(function () {
      camera.alpha += .00075
    })
  
    return scene
  })
}
