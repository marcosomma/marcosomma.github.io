import * as BABYLON from 'babylonjs'
import { getGUILightHouse } from '../GUI'

export const setInteractiveLayerLightHouse = (
  container,
  advancedTexture,
  scene
) => {
  let sphere1 = BABYLON.Mesh.CreateSphere('sphere1', 10.0, 2.5, scene)
  let sphere2 = BABYLON.Mesh.CreateSphere('sphere2', 10.0, 2.5, scene)
  let sphere3 = BABYLON.Mesh.CreateSphere('sphere3', 10.0, 2.5, scene)
  let mat0 = new BABYLON.StandardMaterial('mat0', scene)
  sphere1.position = new BABYLON.Vector3(0, 1, 0)
  sphere2.position = new BABYLON.Vector3(0, 4, 0)
  sphere3.position = new BABYLON.Vector3(0, 7, 0)
  sphere1.material = mat0
  sphere2.material = mat0
  sphere3.material = mat0
  sphere1.material.alpha = 0
  sphere2.material.alpha = 0
  sphere3.material.alpha = 0
  getGUILightHouse(1, sphere1, advancedTexture, scene)
  getGUILightHouse(2, sphere2, advancedTexture, scene)
  getGUILightHouse(3, sphere3, advancedTexture, scene)
  container.meshes.push(sphere1)
  container.meshes.push(sphere2)
  container.meshes.push(sphere3)
}
