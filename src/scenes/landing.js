import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage, getGUITitleDesk, getGUITitleLightHouse } from '../GUI'
import { setInteractiveLayerLightHouse, setInteractiveLayerDesk } from '../actions'
import { importBrainPart, importLightHouse, importDesk, importCreative } from '../imports'
import { getNewCamera, getNewLight, setOutBrainAnimation, setCameraAnimation } from '../common/helper'
// BABYLON.Logger.LogLevels = 3

let selected = undefined
let pageTitle = undefined
let root = ''
let rootRendered = false

const setBtnListeners = (
  btnCenterBrain,
  btnLeftBrain,
  btnRightBrain,
  back,
  centerBrain,
  leftBrain,
  rightBrain,
  camera,
  scene
) => {
  btnCenterBrain.onPointerEnterObservable.add(() => {
    if (selected) return
    btnCenterBrain.color = '#018786'
    centerBrain.setAlpha(1)
    leftBrain.material.alpha = 0.1
    rightBrain.material.alpha = 0.1
  })
  btnCenterBrain.onPointerOutObservable.add(() => {
    if (selected) return
    btnCenterBrain.color = 'black'
    centerBrain.setAlpha(0)
    leftBrain.material.alpha = 1
    rightBrain.material.alpha = 1
  })
  btnCenterBrain.onPointerClickObservable.add(() => {
    if (selected) return
    selected = btnCenterBrain
    setOutBrainAnimation(
      camera,
      centerBrain,
      leftBrain,
      rightBrain,
      btnRightBrain,
      btnLeftBrain,
      new BABYLON.Vector3(0, 50, 0),
      new BABYLON.Vector3(0, 50, 30)
    )
    scene.beginAnimation(camera, 0, 60, false, 1, () => {
      root = 'center'
      btnCenterBrain.color = '#018786'
      centerBrain.material.alpha = 0
      btnCenterBrain.isPickable = false
      back.color = 'black'
    })
  })

  btnLeftBrain.onPointerEnterObservable.add(() => {
    if (selected) return
    btnLeftBrain.color = '#018786'
    rightBrain.setAlpha(1)
    centerBrain.material.alpha = 0.1
    leftBrain.material.alpha = 0.1
  })
  btnLeftBrain.onPointerOutObservable.add(() => {
    if (selected) return
    btnLeftBrain.color = 'black'
    rightBrain.setAlpha(0)
    centerBrain.material.alpha = 1
    leftBrain.material.alpha = 1
  })
  btnLeftBrain.onPointerClickObservable.add(() => {
    if (selected) return
    selected = btnLeftBrain
    setOutBrainAnimation(
      camera,
      rightBrain,
      leftBrain,
      centerBrain,
      btnRightBrain,
      btnCenterBrain,
      new BABYLON.Vector3(-50, 5, 0),
      new BABYLON.Vector3(-50, 7.5, 30)
    )
    scene.beginAnimation(camera, 0, 60, false, 1, () => {
      root = 'left'
      btnLeftBrain.color = '#018786'
      rightBrain.material.alpha = 0
      btnLeftBrain.isPickable = false
      back.color = 'black'
    })
  })

  btnRightBrain.onPointerEnterObservable.add(() => {
    if (selected) return
    btnRightBrain.color = '#018786'
    leftBrain.setAlpha(1)
    centerBrain.material.alpha = 0.1
    rightBrain.material.alpha = 0.1
  })
  btnRightBrain.onPointerOutObservable.add(() => {
    if (selected) return
    btnRightBrain.color = 'black'
    leftBrain.setAlpha(0)
    centerBrain.material.alpha = 1
    rightBrain.material.alpha = 1
  })
  btnRightBrain.onPointerClickObservable.add(() => {
    if (selected) return
    selected = btnRightBrain
    setOutBrainAnimation(
      camera,
      leftBrain,
      rightBrain,
      centerBrain,
      btnLeftBrain,
      btnCenterBrain,
      new BABYLON.Vector3(50, 5, 0),
      new BABYLON.Vector3(50, 7.5, 30)
    )
    scene.beginAnimation(camera, 0, 60, false, 1, () => {
      root = 'right'
      btnRightBrain.color = '#018786'
      leftBrain.material.alpha = 0
      btnRightBrain.isPickable = false
      back.color = 'black'
    })
  })
  back.onPointerClickObservable.add(() => {
    if (!selected) return
    setCameraAnimation(camera, new BABYLON.Vector3(0, 50, 30), new BABYLON.Vector3(0, 50, 0))
    scene.beginAnimation(camera, 0, 60, false, 1, () => {
      root = ''
      btnCenterBrain.color = 'black'
      btnRightBrain.color = 'black'
      btnLeftBrain.color = 'black'
      centerBrain.material.alpha = 1
      leftBrain.material.alpha = 1
      rightBrain.material.alpha = 1
      btnCenterBrain.isPickable = true
      btnRightBrain.isPickable = true
      btnLeftBrain.isPickable = true
      selected = undefined
      back.color = 'transparent'
    })
  })
}

export const Create = (engine, scene, canvas, container, report, space_size) => {
  console.log(GUI.AdvancedDynamicTexture)
  const camera = getNewCamera('mainCamera', scene, canvas, space_size)
  const light = getNewLight('mainLight', scene)
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('LandingUi')

  camera.actionManager = new BABYLON.ActionManager(scene)

  Promise.all([
    importBrainPart('CX', scene, advancedTexture),
    importBrainPart('RX', scene, advancedTexture),
    importBrainPart('LX', scene, advancedTexture),
  ]).then((values) => {
    let [centerBrain, leftBrain, rightBrain] = values
    let {
      panel,
      panelBorder,
      btnCenterBrain,
      btnLeftBrain,
      btnRightBrain,
      back,
      hideMenu,
      showMenu,
    } = getGUILandingPage(advancedTexture)
    setBtnListeners(
      btnCenterBrain,
      btnLeftBrain,
      btnRightBrain,
      back,
      centerBrain,
      leftBrain,
      rightBrain,
      camera,
      scene
    )
    container.cameras.push(camera)
    container.lights.push(light)
    camera.setPosition(new BABYLON.Vector3(0, 7.5, 30))
    camera.setTarget(new BABYLON.Vector3(0, 5, 0))

    scene.registerBeforeRender(function () {
      switch (root) {
        case 'right':
          if (rootRendered) return
          rootRendered = true
          hideMenu()
          setInteractiveLayerDesk(container, advancedTexture, scene, camera)
          pageTitle = getGUITitleDesk(scene, advancedTexture)
          importDesk(scene).then((desk) => {
            desk.forEach((mesh) => {
              container.meshes.push(mesh)
            })
          })
          setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 30), new BABYLON.Vector3(0, 5, 0))
          scene.beginAnimation(camera, 0, 60, false)
          scene.fogDensity = 0.001
          break
        case 'left':
          if (rootRendered) return
          rootRendered = true
          hideMenu()
          importCreative(scene).then((creative) => {
            creative.forEach((mesh) => {
              container.meshes.push(mesh)
            })
          })
          setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 30), new BABYLON.Vector3(0, 5, 0))
          scene.beginAnimation(camera, 0, 60, false)
          break
        case 'center':
          if (rootRendered) return
          rootRendered = true
          hideMenu()
          setInteractiveLayerLightHouse(container, advancedTexture, scene)
          pageTitle = getGUITitleLightHouse(advancedTexture)
          importLightHouse(scene).then((paperHouse) => {
            paperHouse.forEach((mesh, i) => {
              container.meshes.push(mesh)
            })
          })
          setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 30), new BABYLON.Vector3(0, 5, 0))
          scene.beginAnimation(camera, 0, 60, false)
          scene.ambientColor = new BABYLON.Color3(1, 1, 1)
          scene.fogMode = BABYLON.Scene.FOGMODE_EXP
          scene.fogColor = new BABYLON.Color3(0.5, 0.9, 0.8)
          scene.fogDensity = 0.01
          break

        default:
          if (container.meshes) {
            console.log(container.meshes.length, 'mesh to remove')
            container.meshes.forEach((element, index) => {
              element.dispose()
            })
            container.meshes = []
          }
          if (rootRendered) {
            setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 30), new BABYLON.Vector3(0, 5, 0))
            scene.beginAnimation(camera, 0, 60, false)
            showMenu()
            if (pageTitle) {
              if (Array.isArray(pageTitle)) pageTitle.forEach((element) => element.dispose())
              else pageTitle.dispose()
            }
            scene.ambientColor = new BABYLON.Color3(0.25, 0.25, 0.25)
            scene.fogMode = BABYLON.Scene.FOGMODE_EXP
            scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.8)
            scene.fogDensity = 0.01
            rootRendered = false
          }
          camera.alpha += 0.00075
          break
      }
      light.position = camera.position
    })
    scene.ambientColor = new BABYLON.Color3(0.25, 0.25, 0.25)
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.8)
    scene.fogDensity = 0.01
    return scene
  })
}
