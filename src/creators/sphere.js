import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { Camera, Scene, Vector3 } from "babylonjs"
import { AdvancedDynamicTexture } from "babylonjs-gui"

const defaultSpec = {
  segments:12, 
  diameter:2.5, 
  alpha: 1,
  collision: true,
  name: '',

}

export const createSphere = (id, color, camera, advancedTexture, scene, spec=defaultSpec) => {
  console.log(spec)
  let sphere = BABYLON.Mesh.CreateSphere(id, spec.segments, spec.diameter, scene)
  // let sphere = BABYLON.Mesh.CreateTorusKnot(id, Math.random(), Math.random(), 128, 64, 2, 3, scene)

  sphere.material = new BABYLON.StandardMaterial('myMaterial', scene)
  // sphere.material.emissiveColor = color
  sphere.material.diffuseColor = color
  sphere.material.alpha = spec.alpha

  sphere.checkCollisions = spec.collision

  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
    sphere,
    BABYLON.PhysicsImpostor.SphereImpostor,
    {
      mass: 0
    },
    scene
  )
  
  let label = new GUI.Rectangle("label for " + spec.name)
    
  label.background = `rgb(${color.r * 255},${color.g * 255},${color.b * 255})`
  label.height = "30px"
  label.width = "100px"
  label.alpha = 0
  label.isPickable = false
  advancedTexture.addControl(label) 
  label.linkWithMesh(sphere)

  let text1 = new GUI.TextBlock()
  text1.text = spec.name
  text1.color = "white"
  label.addControl(text1)  

  sphere.actionManager = new BABYLON.ActionManager(scene)
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnLeftPickTrigger,
      ((sphere) => {
        let xPos = sphere.position.x
        let yPos =
          sphere.position.y < 0 ? sphere.position.y - 5 : sphere.position.y + 5
        let zPos =
          sphere.position.z < 0
            ? sphere.position.z + 10
            : sphere.position.z - 10
        camera.position = new BABYLON.Vector3(xPos, yPos, zPos)
        camera.setTarget(sphere.position)
        }).bind(this, sphere)
    )
  )  
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      ((sphere) => {
        label.alpha = 0.75
        sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 10, 20), sphere.getAbsolutePosition());
      }).bind(this, sphere)
    )
  )
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      ((sphere) => {
        label.alpha = 0
      }).bind(this, sphere)
    )
  )
  return sphere
}