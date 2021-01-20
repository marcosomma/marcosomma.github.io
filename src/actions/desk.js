import * as BABYLON from 'babylonjs'
import { getGUIDesk } from '../GUI'

const setActionPoint = (actionPoint, position, mat, scaling) => {
  if (scaling) actionPoint.scaling = scaling
  actionPoint.position = position
  actionPoint.material = mat
  actionPoint.isPickable = true
}

export const setInteractiveLayerDesk = (container, advancedTexture, scene) => {
  let actionPoint1 = BABYLON.Mesh.CreateSphere('deskActionPoint1', 10.0, 2.5, scene)
  let actionPoint2 = BABYLON.Mesh.CreateSphere('deskActionPoint2', 10.0, 2.5, scene)
  let actionPoint3 = BABYLON.Mesh.CreateBox('deskActionPoint3', 5, scene)
  let actionPoint4 = BABYLON.Mesh.CreateBox('deskActionPoint4', 3, scene)
  let actionPoint5 = BABYLON.Mesh.CreateBox('deskActionPoint5', 5, scene)
  let actionPoint6 = BABYLON.Mesh.CreateBox('deskActionPoint6', 5, scene)
  let mat0 = new BABYLON.StandardMaterial('mat0-desk', scene)
  mat0.alpha = 0

  setActionPoint(actionPoint1, new BABYLON.Vector3(-1.5, 5, 3.5), mat0)
  setActionPoint(actionPoint2, new BABYLON.Vector3(1.5, 5, 3.5), mat0)
  setActionPoint(actionPoint3, new BABYLON.Vector3(2.5, 7, -2), mat0, new BABYLON.Vector3(0.2, 1, 1))
  setActionPoint(actionPoint4, new BABYLON.Vector3(-1.5, 7, -2), mat0, new BABYLON.Vector3(0.2, 1, 1))
  setActionPoint(actionPoint5, new BABYLON.Vector3(2.5, 7, -8), mat0, new BABYLON.Vector3(0.5, 1.5, 0.8))
  setActionPoint(actionPoint6, new BABYLON.Vector3(-2.5, 7, -8), mat0, new BABYLON.Vector3(0.5, 1.5, 0.8))

  getGUIDesk(1, actionPoint1, advancedTexture, scene)
  getGUIDesk(2, actionPoint2, advancedTexture, scene)
  getGUIDesk(3, actionPoint3, advancedTexture, scene)
  getGUIDesk(4, actionPoint4, advancedTexture, scene)
  getGUIDesk(5, actionPoint5, advancedTexture, scene)
  getGUIDesk(6, actionPoint6, advancedTexture, scene)

  container.meshes.push(actionPoint1)
  container.meshes.push(actionPoint2)
  container.meshes.push(actionPoint3)
  container.meshes.push(actionPoint4)
  container.meshes.push(actionPoint5)
  container.meshes.push(actionPoint6)
}
