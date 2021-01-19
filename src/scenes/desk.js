import * as BABYLON from 'babylonjs'
import { NIGHT_BLUE } from '../common/colors'
let particleSystem

const createNewSystem = (scene) => {
  let fountain = BABYLON.Mesh.CreateBox('foutain', 0.01, scene)
  fountain.visibility = 0

  let fogTexture = new BABYLON.Texture('assets/texture/smoke.png', scene)

  particleSystem = new BABYLON.ParticleSystem('particles', 7500, scene)
  particleSystem.manualEmitCount = particleSystem.getCapacity()
  particleSystem.minEmitBox = new BABYLON.Vector3(-250, -10, -150) // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(250, 10, 150) // To...

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
    BABYLON.Mesh.CreateGroundFromHeightMap(
      'grass',
      'assets/texture/grass.jpg',
      15,
      20,
      450,
      0,
      0.7,
      scene,
      true,
      (grass) => {
        // xray material
        let alpha_mat = new BABYLON.StandardMaterial('aplhaMat', scene)
        alpha_mat.alpha = 0
        let rockMaterial = new BABYLON.StandardMaterial('rockMaterial', scene)
        rockMaterial.bumpTexture = new BABYLON.Texture('assets/texture/lava.jpg', scene)
        rockMaterial.diffuseColor = new BABYLON.Color3.FromHexString('#969696')
        let grassMaterial = new BABYLON.StandardMaterial('grassMaterial', scene)
        grassMaterial.diffuseColor = new BABYLON.Color3.FromHexString('#87ca67')
        grassMaterial.backFaceCulling = false
        let xray_mat = new BABYLON.StandardMaterial('xray', scene)
        xray_mat.emissiveColor = new BABYLON.Color3(1, 1, 1)
        xray_mat.alpha = 0.001
        let fresnel_params = new BABYLON.FresnelParameters()
        fresnel_params.isEnabled = true
        fresnel_params.leftColor = new BABYLON.Color3(0.5, 0.6, 1)
        fresnel_params.rightColor = new BABYLON.Color3(0, 0, 0)
        fresnel_params.power = 0.01
        fresnel_params.bias = 0.001
        let fresnel_params2 = new BABYLON.FresnelParameters()
        fresnel_params2.isEnabled = true
        fresnel_params2.leftColor = new BABYLON.Color3(1, 1, 1)
        fresnel_params2.rightColor = new BABYLON.Color3(0.2, 0.2, 0.2)
        fresnel_params2.power = 0.01
        fresnel_params2.bias = 0.005
        xray_mat.emissiveFresnelParameters = fresnel_params
        xray_mat.opacityFresnelParameters = fresnel_params2
        let multiMat = new BABYLON.MultiMaterial('multiMat', scene)

        grass.material = grassMaterial
        grass.position.y = -0.2

        let sphere = BABYLON.Mesh.CreateSphere('sphere', 24, 30, scene)
        sphere.material = alpha_mat
        sphere.isPickable = false
        let box1 = BABYLON.Mesh.CreateBox('sphere', 30, scene)
        box1.position = new BABYLON.Vector3(0, -15, 0)
        box1.material = alpha_mat
        let box2 = BABYLON.Mesh.CreateBox('sphere', 30, scene)
        box2.position = new BABYLON.Vector3(0, 15, 0)
        box2.material = alpha_mat
        let sphereCSG = BABYLON.CSG.FromMesh(sphere)
        let box1CSG = BABYLON.CSG.FromMesh(box1)
        let box2CSG = BABYLON.CSG.FromMesh(box2)
        let subCSG1 = sphereCSG.subtract(box1CSG)
        let subCSG2 = sphereCSG.subtract(box2CSG)
        let newMesh1 = subCSG1.toMesh('csg1', xray_mat, scene)
        newMesh1.position = new BABYLON.Vector3(0, 0, 0)
        let newMesh2 = subCSG2.toMesh('csg2', rockMaterial, scene)
        newMesh2.position = new BABYLON.Vector3(0, 0, 0)
        newMesh2.checkCollisions = true
        newMesh1.checkCollisions = false
        newMesh1.isPickable = false
        newMesh2.isPickable = false
        newMesh1.material.alpha = 0.001

        scene.fogMode = BABYLON.Scene.FOGMODE_EXP
        scene.fogColor = new BABYLON.Color3.White()
        scene.fogDensity = 0.002

        createNewSystem(scene)

        newMesh1.onDisposeObservable.add(() => {
          particleSystem.dispose()
        })

        resolve({ meshes: [sphere, box1, box2, grass, newMesh1, newMesh2] })
      }
    )
  }).catch((e) => {
    console.log('desk catch error', e)
  })
