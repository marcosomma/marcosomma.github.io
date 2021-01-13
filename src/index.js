import * as BABYLON from 'babylonjs'
import { Create } from './mainScene'
const db = require('./db.json')
//Babylonjs requirements
window.CANNON = require('cannon')
window['BABYLON'] = BABYLON

const canvas = document.getElementById('renderCanvas')
const engine = new BABYLON.Engine(canvas, true)

const renderScene = (json) => {
  const scene = Create(engine, json)
  try {
    engine.runRenderLoop(() => {
      engine.beginFrame()
      scene.render()
      engine.endFrame()
    })

    // Babylonjs trigger resize event
    window.addEventListener('resize', function () {
      engine.resize()
    })
  } catch (error) {
    console.error(error)
  }
}

renderScene(db)
