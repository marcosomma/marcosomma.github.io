import * as BABYLON from 'babylonjs'

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
  let camera = new BABYLON.ArcRotateCamera(id, 1, 1, space_size * 10, new BABYLON.Vector3(0, 5, 0), scene, true)
  camera.attachControl(canvas, false, false, 1)
  camera.collisionRadius = new BABYLON.Vector3(2, 2, 2)
  camera.lowerRadiusLimit = 10
  camera.wheelPrecision = 200
  camera.lowerRadiusLimit = 20
  camera.upperRadiusLimit = 30
  camera.checkCollisions = true

  return camera
}

export const getNewLight = (id, scene) => {
  var light = new BABYLON.HemisphericLight('hemiLight', new BABYLON.Vector3(0, 1, 0), scene)
  light.diffuse = new BABYLON.Color3(255, 255, 255)
  light.specular = new BABYLON.Color3(255, 255, 255)
  // light.groundColor = new BABYLON.Color3(255,255,255);
  light.intensity = 0.005
  light.range = 100
  return light
}

export const setOutBrainAnimation = (
  camera,
  selectedBrainPart,
  objToHide1,
  objToHide2,
  btnToHide1,
  btnToHide2,
  endTarget,
  endPosition
) => {
  btnToHide1.isPickable = false
  btnToHide2.isPickable = false
  btnToHide1.color = '#c2c2c2'
  btnToHide2.color = '#c2c2c2'
  selectedBrainPart.setAlpha(0)
  objToHide1.material.alpha = 0
  objToHide2.material.alpha = 0
  let animationPos = new BABYLON.Animation(
    `desk-enter-animationPos`,
    'position',
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  )
  let animationTarget = new BABYLON.Animation(
    `desk-enter-animationTarget`,
    'target',
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  )
  animationTarget.setKeys([
    { frame: 0, value: camera.target.clone() },
    { frame: 30, value: endTarget },
  ])
  animationPos.setKeys([
    { frame: 0, value: camera.position.clone() },
    { frame: 30, value: endPosition },
  ])
  camera.animations = []
  camera.animations.push(animationTarget)
  camera.animations.push(animationPos)
}

export const setCameraAnimation = (camera, endPosition, endTarget) => {
  let animationPos = new BABYLON.Animation(
    `desk-enter-animationPos`,
    'position',
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  )
  let animationTarget = new BABYLON.Animation(
    `desk-enter-animationTarget`,
    'target',
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  )
  animationTarget.setKeys([
    { frame: 0, value: camera.target.clone() },
    { frame: 30, value: endTarget },
  ])
  animationPos.setKeys([
    { frame: 0, value: camera.position.clone() },
    { frame: 30, value: endPosition },
  ])
  camera.animations = []
  camera.animations.push(animationTarget)
  camera.animations.push(animationPos)
}

export const setChangeColorBackgroundAnimation = (id, startColor, endColor, scene) => {
  let animation = new BABYLON.Animation(
    id,
    'clearColor',
    60,
    BABYLON.Animation.ANIMATIONTYPE_COLOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  )
  animation.setKeys([
    {
      frame: 0,
      value: startColor,
    },
    {
      frame: 30,
      value: endColor,
    },
  ])
  scene.animations = []
  scene.animations.push(animation)
  return scene
}
