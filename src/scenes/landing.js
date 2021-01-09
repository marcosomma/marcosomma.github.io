import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage } from '../GUI/landing'
import {
  importBrainPart,
  importLightHouse,
  importDesk,
  importRobot,
  importYashica,
  importCreative
} from '../imports'
import { getNewCamera, getNewLight } from '../common/helper'
BABYLON.Logger.LogLevels = 3

let selected = undefined
let root = ''
let rootRendered = false

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
    root = 'center'
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
    root = 'left'
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
    root = 'right'
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
    root = ''
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
    let {panel, panelBorder, btnCenterBrain, btnLeftBrain, btnRightBrain, back, hideMenu, showMenu} = getGUILandingPage(advancedTexture)
    setBtnListeners(btnCenterBrain, btnLeftBrain, btnRightBrain, back, centerBrain, leftBrain, rightBrain, camera)
    container.cameras.push(camera)
    container.lights.push(light)
    camera.setPosition(new BABYLON.Vector3(0,5,30))
    camera.setTarget(new BABYLON.Vector3(0,0,0))

    scene.registerBeforeRender(function () {
      switch (root) {
        case 'right':
          if(rootRendered) return
          rootRendered = true
          panelBorder.top = -200
          hideMenu()
          console.log(panel)
          importDesk(scene).then(desk => {
            console.log('desk',desk)
            desk.forEach(mesh => {
              container.meshes.push(mesh)
            })
          })
          camera.setPosition(new BABYLON.Vector3(0,7.5,7.5))
          camera.setTarget(new BABYLON.Vector3(0,5,0))
          break;
        case 'left':
          if(rootRendered) return
          panelBorder.top = -200
          hideMenu()
          rootRendered = true
          importCreative(scene).then(creative => {
            console.log('creative',creative)
            creative.forEach(mesh => {
              container.meshes.push(mesh)
            })
          })
          camera.setPosition(new BABYLON.Vector3(0,7.5,7.5))
          camera.setTarget(new BABYLON.Vector3(0,5,0))
          break;
        case 'center':
          if(rootRendered) return
          panelBorder.top = -200
          hideMenu()
          rootRendered = true
          importLightHouse(scene).then(paperHouse => {
            paperHouse.forEach(mesh => {
              container.meshes.push(mesh)
            })
          })
          camera.setPosition(new BABYLON.Vector3(0,7.5,7.5))
          camera.setTarget(new BABYLON.Vector3(0,5,0))
          break;
      
        default:
          if(rootRendered){
            panelBorder.top = 0
            showMenu()
            camera.setPosition(new BABYLON.Vector3(0,5,30))
            camera.setTarget(new BABYLON.Vector3(0,0,0))
            console.log(container.meshes.length, 'mesh to remove')
            if(container.meshes) container.meshes.forEach((element, index) => {
              element.dispose()
            });
            rootRendered = false
          }
          container.meshes = []
          camera.alpha += .00075
          break;
      }
    })
    scene.ambientColor = new BABYLON.Color3(0.25, 0.25, 0.25)
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.8)
    scene.fogDensity = 0.01
    return scene
  })
}
