import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { getNewScene } from './helper'

import { Create as Landing } from './scenes/landing'

const canvas = document.getElementById('renderCanvas')
export const Create = (engine, report) => {
    const space_size = Object.keys(report).length
    const scene = getNewScene(engine)
    const queryString = window.location.search
    let container = new BABYLON.AssetContainer(scene)
    
    // GUI
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("MainUi")

    console.log(queryString)
    if(queryString) {
      Test(engine, scene, canvas, container, report, space_size)
    } else {
      Landing(engine, scene, canvas, container,  report, space_size)
    }

    scene.registerBeforeRender(function () {
        scene.disablePhysicsEngine()
        scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.CannonJSPlugin())
    })

    return scene
}