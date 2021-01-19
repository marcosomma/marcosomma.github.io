import * as BABYLON from 'babylonjs'
import { Create } from './mainScene'
import { loadAssets as Loader } from './assets'
const db = require('./db.json')
require('./common/customLoading')
//Babylonjs requirements
window.CANNON = require('cannon')
window['BABYLON'] = BABYLON

const canvas = document.getElementById('renderCanvas')
const engine = new BABYLON.Engine(canvas, true)

const renderScene = (json) => {
  engine.displayLoadingUI()
  const scene = Create(engine, json)
  try {
    Loader(scene, () =>
      engine.runRenderLoop(() => {
        engine.beginFrame()
        scene.render()
        engine.endFrame()
      })
    )

    // Babylonjs trigger resize event
    window.addEventListener('resize', function () {
      engine.resize()
    })
  } catch (error) {
    console.error(error)
  }
}

renderScene(db)
