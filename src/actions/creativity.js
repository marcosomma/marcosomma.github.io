import * as BABYLON from 'babylonjs'
import { getGUICretivity } from '../GUI'

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

  actionPoint4.scaling = new BABYLON.Vector3(1, 3.3, 1.4)

  actionPoint1.position = new BABYLON.Vector3(5.8, 2, 0)
  actionPoint2.position = new BABYLON.Vector3(14.2, 0.5, 0)
  actionPoint3.position = new BABYLON.Vector3(-4.5, 2, 0)
  actionPoint4.position = new BABYLON.Vector3(-14, 7.4, -0.5)

  actionPoint1.material = mat0
  actionPoint2.material = mat0
  actionPoint3.material = mat0
  actionPoint4.material = mat0

  actionPoint1.isPickable = true
  actionPoint2.isPickable = true
  actionPoint3.isPickable = true
  actionPoint4.isPickable = true

  actionPoint1.material.alpha = 0.1
  actionPoint2.material.alpha = 0.1
  actionPoint3.material.alpha = 0.1
  actionPoint4.material.alpha = 0.1

  lightSpot1.diffuse = new BABYLON.Color3.Random()
  lightSpot2.diffuse = new BABYLON.Color3.Random()
  lightSpot3.diffuse = new BABYLON.Color3.Random()
  lightSpot4.diffuse = new BABYLON.Color3.Random()

  lightSpot1.specular = new BABYLON.Color3.Random()
  lightSpot2.specular = new BABYLON.Color3.Random()
  lightSpot3.specular = new BABYLON.Color3.Random()
  lightSpot4.specular = new BABYLON.Color3.Random()

  lightSpot1.intensity = 0
  lightSpot2.intensity = 0
  lightSpot3.intensity = 0
  lightSpot4.intensity = 0

  lightSpot1.radius = 0.2
  lightSpot2.radius = 0.2
  lightSpot3.radius = 0.2
  lightSpot4.radius = 0.2

  lightSpot1.setDirectionToTarget(actionPoint1.position)
  lightSpot2.setDirectionToTarget(actionPoint2.position)
  lightSpot3.setDirectionToTarget(actionPoint3.position)
  lightSpot4.setDirectionToTarget(actionPoint4.position)

  getGUICretivity(1, actionPoint1, advancedTexture, scene)
  getGUICretivity(2, actionPoint2, advancedTexture, scene)
  getGUICretivity(3, actionPoint3, advancedTexture, scene)
  getGUICretivity(4, actionPoint4, advancedTexture, scene)

  actionPoint1.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'target',
      actionPoint1.position,
      150
    )
  )
  actionPoint1.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'position',
      new BABYLON.Vector3(actionPoint1.position.x, actionPoint1.position.y, actionPoint1.position.z + 8),
      300
    )
  )
  actionPoint1.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, lightSpot1, 'intensity', 1, 60)
  )
  actionPoint1.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, lightSpot1, 'intensity', 0, 60)
  )

  actionPoint2.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'target',
      actionPoint2.position,
      150
    )
  )
  actionPoint2.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'position',
      new BABYLON.Vector3(actionPoint2.position.x, actionPoint2.position.y, actionPoint2.position.z + 8),
      300
    )
  )
  actionPoint2.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, lightSpot2, 'intensity', 1, 60)
  )
  actionPoint2.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, lightSpot2, 'intensity', 0, 60)
  )

  actionPoint3.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'target',
      actionPoint3.position,
      150
    )
  )
  actionPoint3.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'position',
      new BABYLON.Vector3(actionPoint3.position.x, actionPoint3.position.y, actionPoint3.position.z + 8),
      300
    )
  )
  actionPoint3.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, lightSpot3, 'intensity', 1, 60)
  )
  actionPoint3.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, lightSpot3, 'intensity', 0, 60)
  )

  actionPoint4.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'target',
      actionPoint4.position,
      150
    )
  )
  actionPoint4.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPickTrigger,
      camera,
      'position',
      new BABYLON.Vector3(actionPoint4.position.x, actionPoint4.position.y - 3, actionPoint4.position.z + 8),
      300
    )
  )
  actionPoint4.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, lightSpot4, 'intensity', 1, 60)
  )
  actionPoint4.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, lightSpot4, 'intensity', 0, 60)
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
