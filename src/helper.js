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

export const getControlPositions = (originPos, targetPos) => {
  var y = targetPos.y
  var x = targetPos.x
  var z = targetPos.z
  return new BABYLON.Vector3(x, y, z)
}

export const getAnimationSphere = () => {
  var scaleAnimation = new BABYLON.Animation("scaleAnimation", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
  var keys = [{
    frame: 0,
    value: new BABYLON.Vector3(1, 1, 1)
  }, {
    frame: 5,
    value: new BABYLON.Vector3(1.2, 1.2, 1.2)
  }, {
    frame: 10,
    value: new BABYLON.Vector3(0.5, 0.5, 0.5)
  }, {
    frame: 15,
    value: new BABYLON.Vector3(1, 1, 1)
  }]

  scaleAnimation.setKeys(keys)

  return scaleAnimation
}

export const createLabel = (advancedTexture, mesh) => {
  let label = new GUI.Rectangle("label for " + mesh.name)

  label.background = "transparent"
  label.height = "15px"
  label.alpha = 1
  label.width = "30px"
  label.cornerRadius = 10
  label.thickness = 0
  advancedTexture.addControl(label)
  label.linkWithMesh(mesh)

  let text = new GUI.TextBlock()
  text.text = mesh.name.slice(0, 4)
  text.alpha = 1
  text.color = "#fff"
  text.fontFamily = "Roboto"
  let style = advancedTexture.createStyle()
  style.fontSize = 14
  style.fontWeight = 'bold'
  text.style = style
  label.addControl(text)

  return label
}

export const getAxonShape = () => {
  var myShape = [
    new BABYLON.Vector3(0, 0.1, 0),
    new BABYLON.Vector3(-0.05, 0, 0),
    new BABYLON.Vector3(0, -0.1, 0),
  ]

  myShape.push(myShape[0])
  return myShape
}