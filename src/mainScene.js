import * as BABYLON from 'babylonjs'
import { getNewScene } from './common/helper'
import { Create as Landing } from './scenes/landing'

const canvas = document.getElementById('renderCanvas')
export const Create = (engine, report) => {
  const space_size = Object.keys(report).length
  const scene = getNewScene(engine)
  let container = new BABYLON.AssetContainer(scene)

  Landing(engine, scene, canvas, container, report, space_size)

  scene.registerBeforeRender(function () {
    scene.disablePhysicsEngine()
    scene.enablePhysics(
      new BABYLON.Vector3(0, 0, 0),
      new BABYLON.CannonJSPlugin()
    )
  })

  return scene
}
