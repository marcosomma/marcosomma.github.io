import * as BABYLON from 'babylonjs'
import { getGUICretivity } from '../GUI'

const setActionPoint = (actionPoint, position, mat, scaling) => {
  if (scaling) actionPoint.scaling = scaling
  actionPoint.position = position
  actionPoint.material = mat
  actionPoint.isPickable = true
}

const setLightSpot = (lightSpot) => {
  lightSpot.diffuse = new BABYLON.Color3.Random()
  lightSpot.specular = new BABYLON.Color3.Random()
  lightSpot.intensity = 0
  lightSpot.radius = 0.2
}

const setAction = (actionPoint, targetClick, lightSpot, valuePositionClick, interval) => {
  actionPoint.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      targetClick,
      'target',
      actionPoint.position,
      interval
    )
  )
  actionPoint.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      targetClick,
      'position',
      valuePositionClick,
      interval * 2
    )
  )

  actionPoint.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, lightSpot, 'intensity', 1, 60)
  )
  actionPoint.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, lightSpot, 'intensity', 0, 60)
  )
}

export const setInteractiveLayerCreativity = (container, advancedTexture, scene, camera) => {
  let actionPoint1 = BABYLON.Mesh.CreateSphere('creativityActionPoint-robot', 10.0, 8, scene)
  let actionPoint2 = BABYLON.Mesh.CreateSphere('creativityActionPoint-videogames', 10.0, 5, scene)
  let actionPoint3 = BABYLON.Mesh.CreateSphere('creativityActionPoint-photo', 10.0, 8, scene)
  let actionPoint4 = BABYLON.Mesh.CreateBox('deskActionPoint-music', 5, scene)
  let lightSpot1 = new BABYLON.SpotLight(
    'spotLight-robot',
    new BABYLON.Vector3(5.8, 20, 8),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI,
    10,
    scene
  )
  let lightSpot2 = new BABYLON.SpotLight(
    'spotLight-videogames',
    new BABYLON.Vector3(14, 20, 8),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI,
    10,
    scene
  )
  let lightSpot3 = new BABYLON.SpotLight(
    'spotLight-photo',
    new BABYLON.Vector3(-4.8, 20, 8),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI,
    10,
    scene
  )
  let lightSpot4 = new BABYLON.SpotLight(
    'spotLight-music',
    new BABYLON.Vector3(-14, 20, 8),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI,
    10,
    scene
  )
  let mat0 = new BABYLON.StandardMaterial('mat0-creativity', scene)
  mat0.alpha = 0
  setActionPoint(actionPoint1, new BABYLON.Vector3(5.8, 2, 0), mat0)
  setActionPoint(actionPoint2, new BABYLON.Vector3(14.2, 0.5, 0), mat0)
  setActionPoint(actionPoint3, new BABYLON.Vector3(-4.5, 2, 0), mat0)
  setActionPoint(actionPoint4, new BABYLON.Vector3(-14, 7.4, -0.5), mat0, new BABYLON.Vector3(1, 3.3, 1.4))

  setLightSpot(lightSpot1)
  setLightSpot(lightSpot2)
  setLightSpot(lightSpot3)
  setLightSpot(lightSpot4)

  lightSpot1.setDirectionToTarget(actionPoint1.position)
  lightSpot2.setDirectionToTarget(actionPoint2.position)
  lightSpot3.setDirectionToTarget(actionPoint3.position)
  lightSpot4.setDirectionToTarget(actionPoint4.position)

  getGUICretivity(1, actionPoint1, advancedTexture, scene)
  getGUICretivity(2, actionPoint2, advancedTexture, scene)
  getGUICretivity(3, actionPoint3, advancedTexture, scene)
  getGUICretivity(4, actionPoint4, advancedTexture, scene)

  setAction(
    actionPoint1,
    camera,
    lightSpot1,
    new BABYLON.Vector3(actionPoint1.position.x, actionPoint1.position.y, actionPoint1.position.z + 8),
    150
  )
  setAction(
    actionPoint2,
    camera,
    lightSpot2,
    new BABYLON.Vector3(actionPoint2.position.x, actionPoint2.position.y, actionPoint2.position.z + 8),
    150
  )
  setAction(
    actionPoint3,
    camera,
    lightSpot3,
    new BABYLON.Vector3(actionPoint3.position.x, actionPoint3.position.y, actionPoint3.position.z + 8),
    150
  )
  setAction(
    actionPoint4,
    camera,
    lightSpot4,
    new BABYLON.Vector3(actionPoint4.position.x, actionPoint4.position.y - 3, actionPoint4.position.z + 8),
    150
  )

  container.meshes.push(actionPoint1)
  container.meshes.push(actionPoint2)
  container.meshes.push(actionPoint3)
  container.meshes.push(actionPoint4)
  container.lights.push(lightSpot1)
  container.lights.push(lightSpot2)
  container.lights.push(lightSpot3)
  container.lights.push(lightSpot4)
}
