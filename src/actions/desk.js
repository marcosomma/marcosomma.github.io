import * as BABYLON from 'babylonjs'
import { getGUIDesk } from '../GUI'

export const setInteractiveLayerDesk = (container, advancedTexture, scene) => {
  let actionPoint1 = BABYLON.Mesh.CreateSphere('deskActionPoint1', 10.0, 2.5, scene)
  let actionPoint2 = BABYLON.Mesh.CreateSphere('deskActionPoint2', 10.0, 2.5, scene)
  let actionPoint3 = BABYLON.Mesh.CreateBox('deskActionPoint3', 5, scene)
  let actionPoint4 = BABYLON.Mesh.CreateBox('deskActionPoint4', 3, scene)
  let actionPoint5 = BABYLON.Mesh.CreateBox('deskActionPoint5', 5, scene)
  let actionPoint6 = BABYLON.Mesh.CreateBox('deskActionPoint6', 5, scene)
  let mat0 = new BABYLON.StandardMaterial('mat0-desk', scene)

  actionPoint1.position = new BABYLON.Vector3(-1.5, 5, 3.5)
  actionPoint2.position = new BABYLON.Vector3(1.5, 5, 3.5)
  actionPoint3.position = new BABYLON.Vector3(2.5, 7, -2)
  actionPoint4.position = new BABYLON.Vector3(-1.5, 7, -2)
  actionPoint5.position = new BABYLON.Vector3(2.5, 7, -8)
  actionPoint6.position = new BABYLON.Vector3(-2.5, 7, -8)

  actionPoint3.scaling = new BABYLON.Vector3(0.2, 1, 1)
  actionPoint4.scaling = new BABYLON.Vector3(0.2, 1, 1)
  actionPoint5.scaling = new BABYLON.Vector3(0.5, 1.5, 0.8)
  actionPoint6.scaling = new BABYLON.Vector3(0.5, 1.5, 0.8)

  actionPoint1.material = mat0
  actionPoint2.material = mat0
  actionPoint3.material = mat0
  actionPoint4.material = mat0
  actionPoint5.material = mat0
  actionPoint6.material = mat0

  actionPoint1.isPickable = true
  actionPoint2.isPickable = true
  actionPoint3.isPickable = true
  actionPoint4.isPickable = true
  actionPoint5.isPickable = true
  actionPoint6.isPickable = true

  actionPoint1.material.alpha = 0
  actionPoint2.material.alpha = 0
  actionPoint3.material.alpha = 0
  actionPoint4.material.alpha = 0
  actionPoint5.material.alpha = 0
  actionPoint6.material.alpha = 0

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
