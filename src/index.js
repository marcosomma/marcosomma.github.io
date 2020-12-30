import * as BABYLON from 'babylonjs'
import {
  Create
} from './mainScene'
const db = require('./db.json')
//Babylonjs requirements
window.CANNON = require('cannon')
window['BABYLON'] = BABYLON

const canvas = document.getElementById('renderCanvas')
const engine = new BABYLON.Engine(canvas, true)

const renderScene = (json) => {
  console.log(json)
  const scene = Create(engine, json)
  try {
    // Start render loop
    engine.runRenderLoop(() => {
      scene.render()
    })

    // Babylonjs trigger resize event
    window.addEventListener("resize", function () {
      engine.resize();
    });
  } catch (error) {
    console.error(error)
  }
}
console.log(db)
renderScene(db)