import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export const getNewScene = (engine) => {
  let scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color3(1, 1, 1)
  scene.ambientColor = new BABYLON.Color3(1, 1, 1)
  scene.exclusiveDoubleMode = false
  scene.enablePhysics(true, new BABYLON.CannonJSPlugin())
  scene.collisionsEnabled = true

  return scene
}

export const getNewCamera = (id, scene, canvas, space_size) => {
  let camera = new BABYLON.ArcRotateCamera(id, 1, 1, space_size * 10, new BABYLON.Vector3.Zero, scene, true)
  camera.attachControl(canvas, false, false, 1 )
  camera.collisionRadius = new BABYLON.Vector3(10, 10, 10)
  camera.lowerRadiusLimit = 20  
  camera.wheelPrecision = 100

  return camera
}

export const getNewLight = (id, scene) => {
  var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
  light.diffuse = new BABYLON.Color3(255,255,255);
  light.specular = new BABYLON.Color3(255,255,255);
  // light.groundColor = new BABYLON.Color3(255,255,255);
  light.intensity = 0.005
  light.range = 100
  return light
}
