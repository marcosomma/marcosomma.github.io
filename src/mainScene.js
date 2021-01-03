import * as BABYLON from 'babylonjs'
import queryString from 'query-string'
import { getNewScene } from './common/helper'
import { Create as Landing } from './scenes/landing'
import { Create as Experiences } from './scenes/esperiences'

const canvas = document.getElementById('renderCanvas')
export const Create = (engine, report) => {
    const space_size = Object.keys(report).length
    const scene = getNewScene(engine)
    let container = new BABYLON.AssetContainer(scene)
    const parsed = queryString.parse(location.search)

    console.log('Routing to:',parsed)
    switch (parsed.root) {
      case 'experiences':
        Experiences(engine, scene, canvas, container,  report, space_size)
        break;
      default:
        Landing(engine, scene, canvas, container,  report, space_size)
        break;
    }

    scene.registerBeforeRender(function () {
        scene.disablePhysicsEngine()
        scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.CannonJSPlugin())
    })

    return scene
}