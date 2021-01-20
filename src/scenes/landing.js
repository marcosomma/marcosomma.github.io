import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getGUILandingPage, getGUITitleDesk, getGUITitleLightHouse, getGUITitleCreativity, getGUILoading } from '../GUI'
import { setInteractiveLayerLightHouse, setInteractiveLayerDesk, setInteractiveLayerCreativity } from '../actions'
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
import { createEnvironment as createCreativityEnviroment } from './creativity'
import { NIGHT_BLUE, DAY_BLUE, NIGHT_DARK } from '../common/colors'
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
  const light = getNewLight(scene)
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('LandingUi')
  advancedTexture.idealHeight = 900
  advancedTexture.idealWidth = 1440
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
          setInteractiveLayerDesk(container, advancedTexture, scene)
          pageTitle = getGUITitleDesk(scene, advancedTexture)
          light.intensity = 1.5
          light.diffuse = new BABYLON.Color3.FromHexString('#fbfbfb')
          importDesk(scene).then((desk) => {
            createDeskEnviroment(scene).then((deskEnv) => {
              desk.forEach((mesh) => {
                container.meshes.push(mesh)
              })
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
              setCameraAnimation(camera, new BABYLON.Vector3(0, 15, 40), new BABYLON.Vector3(0, 5, 0))
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
          setInteractiveLayerCreativity(container, advancedTexture, scene, camera)
          pageTitle = getGUITitleCreativity(scene, advancedTexture)
          light.setEnabled(false)
          importCreative(scene).then((creative) => {
            createCreativityEnviroment(scene).then((creativityEnv) => {
              creative.forEach((mesh) => {
                container.meshes.push(mesh)
              })
              creativityEnv.meshes.forEach((envMesh) => {
                container.meshes.push(envMesh)
              })
              scene.fogDensity = 0
              latestBackground = NIGHT_DARK
              setChangeColorBackgroundAnimation(
                'to-creativity-animation',
                new BABYLON.Color3(1, 1, 1),
                latestBackground,
                scene
              )
              setCameraAnimation(camera, new BABYLON.Vector3(0, 7.5, 40), new BABYLON.Vector3(0, 5, 0))
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
          light.setEnabled(false)
          setInteractiveLayerLightHouse(container, advancedTexture, scene)
          pageTitle = getGUITitleLightHouse(advancedTexture)
          importLightHouse(scene).then((paperHouse) => {
            createLightHouseEnviroment(scene).then((lightHouseEnv) => {
              paperHouse.forEach((mesh, i) => {
                container.meshes.push(mesh)
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
          })
          break

        default:
          if (!light.isEnabled()) light.setEnabled(true)
          if (light.intensity !== 1.2) light.intensity = 1.2
          if (light.diffuse !== new BABYLON.Color3.White()) light.diffuse = new BABYLON.Color3.White()
          if (scene.fogDensity !== 0.01) scene.fogDensity = 0.01
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

            rootRendered = false
          }
          camera.alpha += 0.00075
          break
      }
      // light.position = camera.position
    })
    scene.ambientColor = new BABYLON.Color3(0.25, 0.25, 0.25)
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.8)
    scene.fogDensity = 0.01
    return scene
  })
}
