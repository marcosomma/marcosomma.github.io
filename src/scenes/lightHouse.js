import * as BABYLON from 'babylonjs'
import { NIGHT_BLUE } from '../common/colors'

let particleSystem

const createNewSystem = (scene) => {
  let fountain = BABYLON.Mesh.CreateBox('foutain', 0.01, scene)
  fountain.visibility = 0

  let fogTexture = new BABYLON.Texture('assets/texture/smoke.png', scene)

  particleSystem = new BABYLON.ParticleSystem('particles', 7500, scene)
  particleSystem.manualEmitCount = particleSystem.getCapacity()
  particleSystem.minEmitBox = new BABYLON.Vector3(-250, 0.1, -150) // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(250, 0.1, 150) // To...

  particleSystem.particleTexture = fogTexture.clone()
  particleSystem.emitter = fountain

  particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1)
  particleSystem.color2 = new BABYLON.Color4(0.95, 0.95, 0.95, 0.15)
  particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1)
  particleSystem.minSize = 7
  particleSystem.maxSize = 10.0
  particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER
  particleSystem.emitRate = 15000
  particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD
  particleSystem.gravity = new BABYLON.Vector3(0.25, 0, 0.25)
  particleSystem.direction1 = new BABYLON.Vector3(0.25, 0, 0.25)
  particleSystem.direction2 = new BABYLON.Vector3(0, 0.25, 0.25)
  particleSystem.minAngularSpeed = 0
  particleSystem.maxAngularSpeed = 0.02
  particleSystem.minEmitPower = 0.05
  particleSystem.maxEmitPower = 1
  particleSystem.updateSpeed = 0.1

  particleSystem.start()
}
export const createEnvironment = (scene) =>
  new Promise((resolve, reject) => {
    let plane = BABYLON.Mesh.CreateGroundFromHeightMap(
      'sea',
      'assets/texture/water/Water_001_NORM.jpg',
      500,
      250,
      25,
      0,
      5,
      scene,
      false
    )
    plane.checkCollisions = true
    let seaMaterial = new BABYLON.StandardMaterial('seaMaterial', scene)
    seaMaterial.diffuseColor = NIGHT_BLUE
    //   seaMaterial.emissiveColor =
    plane.material = seaMaterial
    plane.position.y = -3.5
    let lightHouse1 = new BABYLON.SpotLight(
      'spotLight1',
      new BABYLON.Vector3(0, 20, 0),
      new BABYLON.Vector3(0, -1, 0),
      Math.PI,
      10,
      scene
    )
    let lightHouse2 = new BABYLON.SpotLight(
      'spotLight2',
      new BABYLON.Vector3(0, 0, 9),
      new BABYLON.Vector3(0, 0.5, -0.5),
      Math.PI,
      20,
      scene
    )
    let lightHouse3 = new BABYLON.SpotLight(
      'spotLight3',
      new BABYLON.Vector3(0, 0, -9),
      new BABYLON.Vector3(0, 1, 1),
      Math.PI,
      20,
      scene
    )
    lightHouse1.diffuse = new BABYLON.Color3(1, 1, 1)
    lightHouse1.specular = new BABYLON.Color3(1, 1, 1)
    lightHouse2.diffuse = new BABYLON.Color3(1, 1, 1)
    lightHouse2.specular = new BABYLON.Color3(1, 1, 1)
    lightHouse3.diffuse = new BABYLON.Color3(1, 1, 1)
    lightHouse3.specular = new BABYLON.Color3(1, 1, 1)
    lightHouse1.intensity = 2
    lightHouse2.intensity = 2
    lightHouse3.intensity = 2

    createNewSystem(scene)

    plane.onDisposeObservable.add(() => {
      particleSystem.dispose()
    })

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP
    scene.fogColor = NIGHT_BLUE
    scene.fogDensity = 0.02
    resolve({ meshes: [plane], lights: [lightHouse1, lightHouse2, lightHouse3] })
  }).catch((e) => {
    console.log('lightHouse catch error', e)
  })
