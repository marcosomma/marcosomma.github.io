import * as BABYLON from 'babylonjs'
import { getGUIDesk } from '../GUI'

const setActionPoint = (actionPoint, position, mat, scaling) => {
  if (scaling) actionPoint.scaling = scaling
  actionPoint.position = position
  actionPoint.material = mat
  actionPoint.isPickable = true
}

export const setInteractiveLayerDesk = (container, advancedTexture, scene) => {
  let actionPoint1 = BABYLON.Mesh.CreateBox('deskActionPoint1', 5, scene)
  let actionPoint2 = BABYLON.Mesh.CreateBox('deskActionPoint2', 5, scene)
  let actionPoint3 = BABYLON.Mesh.CreateBox('deskActionPoint3', 5, scene)
  let mat0 = new BABYLON.StandardMaterial('mat0-desk', scene)
  mat0.alpha = 0

  setActionPoint(actionPoint1, new BABYLON.Vector3(-2.5, 5, 0), mat0, new BABYLON.Vector3(1, 1, 2))
  setActionPoint(actionPoint2, new BABYLON.Vector3(2.5, 5, 0), mat0, new BABYLON.Vector3(1, 1, 2))
  setActionPoint(actionPoint3, new BABYLON.Vector3(0, 7, -7.5), mat0, new BABYLON.Vector3(1.5, 2, 0.8))

  getGUIDesk(1, actionPoint1, advancedTexture, scene)
  getGUIDesk(2, actionPoint2, advancedTexture, scene)
  getGUIDesk(3, actionPoint3, advancedTexture, scene)

  container.meshes.push(actionPoint1)
  container.meshes.push(actionPoint2)
  container.meshes.push(actionPoint3)
}
