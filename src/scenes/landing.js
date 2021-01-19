import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage, getGUITitleDesk, getGUITitleLightHouse, getGUILoading } from '../GUI'
import { setInteractiveLayerLightHouse, setInteractiveLayerDesk } from '../actions'
import { importBrainPart, importLightHouse, importDesk, importCreative } from '../imports'
import {
  getNewCamera,
  getNewLight,
  setOutBrainAnimation,
  setCameraAnimation,
  setChangeColorBackgroundAnimation,
} from '../common/helper'
import { createEnvironment as createLightHouseEnviroment } from './lightHouse'
import { createEnvironment as createDeskEnviroment } from './desk'
import { NIGHT_BLUE, DAY_BLUE, LIGHT_BLUE } from '../common/colors'
// BABYLON.Logger.LogLevels = 3

let selected = undefined
let pageTitle = undefined
let root = ''
let rootRendered = false
let latestBackground = new BABYLON.Color3(1, 1, 1)

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
      new BABYLON.Vector3(-100, 5, 0),
      new BABYLON.Vector3(-100, 7.5, 30)
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
      new BABYLON.Vector3(100, 5, 0),
      new BABYLON.Vector3(100, 7.5, 30)
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
  const camera = getNewCamera('mainCamera', scene, canvas, space_size)
  const light = getNewLight('mainLight', scene)
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('LandingUi')
  const Loading = getGUILoading(advancedTexture)
  Loading.isVisible = false

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
    camera.setPosition(new BABYLON.Vector3(0, 7.5, 30))
    camera.setTarget(new BABYLON.Vector3(0, 0, 0))

    scene.registerBeforeRender(() => {
      switch (root) {
        case 'right':
          if (rootRendered) return
          rootRendered = true
          Loading.isVisible = true
          hideMenu()
          setInteractiveLayerDesk(container, advancedTexture, scene, camera)
          pageTitle = getGUITitleDesk(scene, advancedTexture)
          importDesk(scene).then((desk) => {
            desk.forEach((mesh) => {
              container.meshes.push(mesh)
            })
            createDeskEnviroment(scene).then((deskEnv) => {
              deskEnv.meshes.forEach((envMesh) => {
                container.meshes.push(envMesh)
              })
              latestBackground = DAY_BLUE
              setChangeColorBackgroundAnimation(
                'to-desk-animation',
                new BABYLON.Color3(1, 1, 1),
                latestBackground,
                scene
              )
              setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 30), new BABYLON.Vector3(0, 5, 0))
              Loading.isVisible = false
              scene.beginAnimation(camera, 0, 60, false)
              scene.beginAnimation(scene, 0, 60, false)
            })
          })

          break
        case 'left':
          if (rootRendered) return
          rootRendered = true
          Loading.isVisible = true
          hideMenu()
          importCreative(scene).then((creative) => {
            creative.forEach((mesh) => {
              container.meshes.push(mesh)
              latestBackground = LIGHT_BLUE
              setChangeColorBackgroundAnimation(
                'to-creativity-animation',
                new BABYLON.Color3(1, 1, 1),
                latestBackground,
                scene
              )
              setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 30), new BABYLON.Vector3(0, 5, 0))
              Loading.isVisible = false
              scene.beginAnimation(camera, 0, 60, false)
              scene.beginAnimation(scene, 0, 60, false)
            })
          })

          break
        case 'center':
          if (rootRendered) return
          rootRendered = true
          Loading.isVisible = true
          hideMenu()
          setInteractiveLayerLightHouse(container, advancedTexture, scene)
          pageTitle = getGUITitleLightHouse(advancedTexture)
          createLightHouseEnviroment(scene).then((lightHouseEnv) => {
            light.setEnabled(false)
            importLightHouse(scene).then((paperHouse) => {
              paperHouse.forEach((mesh, i) => {
                container.meshes.push(mesh)
              })
            })
            lightHouseEnv.meshes.forEach((envMesh) => {
              container.meshes.push(envMesh)
            })
            lightHouseEnv.lights.forEach((envLight) => {
              container.lights.push(envLight)
            })
            latestBackground = NIGHT_BLUE
            setChangeColorBackgroundAnimation(
              'to-lightHouse-animation',
              new BABYLON.Color3(1, 1, 1),
              latestBackground,
              scene
            )
            setCameraAnimation(camera, new BABYLON.Vector3(0, 2.1, 30), new BABYLON.Vector3(0, 5, 0))
            Loading.isVisible = false
            scene.beginAnimation(camera, 0, 60, false)
            scene.beginAnimation(scene, 0, 60, false)
          })
          break

        default:
          if (!light.isEnabled()) light.setEnabled(true)
          if (container.meshes.length) console.log(container.meshes.length, 'mesh to remove')
          if (container.lights.length) console.log(container.lights.length, 'lights to remove')
          container.meshes.forEach((element, index) => {
            element.dispose()
          })
          container.lights.forEach((element, index) => {
            element.dispose()
          })
          container.meshes = []
          container.lights = []
          if (rootRendered) {
            if (pageTitle) {
              if (Array.isArray(pageTitle)) pageTitle.forEach((element) => element.dispose())
              else pageTitle.dispose()
            }
            setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 30), new BABYLON.Vector3(0, 0, 0))
            setChangeColorBackgroundAnimation(
              'back-to-landing-animation',
              latestBackground,
              new BABYLON.Color3(1, 1, 1),
              scene
            )
            scene.beginAnimation(camera, 0, 60, false)
            scene.beginAnimation(scene, 0, 60, false)
            showMenu()
            latestBackground = new BABYLON.Color3(1, 1, 1)
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
