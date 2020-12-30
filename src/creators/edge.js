import * as BABYLON from 'babylonjs'
import { getControlPositions, getAxonShape } from '../helper'

export const createEdge = (id, originObj, targetObj, color, light, scene) => {
  let origin = new BABYLON.Vector3(
    originObj.position.x,
    originObj.position.y,
    originObj.position.z
  )

  let points = BABYLON.Curve3.CreateQuadraticBezier(
    origin,
    getControlPositions(origin, targetObj.position),
    targetObj.position,
    24
  )

  let line = BABYLON.MeshBuilder.ExtrudeShape(
    id,
    {
      shape: getAxonShape(),
      path: points.getPoints(),
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      updatable: true,
    },
    scene
  )

  line.checkCollisions = true

  line.material = new BABYLON.StandardMaterial('lineMaterial', scene)
  line.material.emissiveColor = color

  console.log(light)
  light.excludedMeshes.push(line)
  return line
}
