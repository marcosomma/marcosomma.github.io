import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import {
  getControlPositions,
  getAnimationSphere,
  getAxonShape,
  getIOShape,
} from './helper'
import 'babylonjs-loaders';

export const createGround = (scene, ground_size, name) => {
  let segments = Math.floor(ground_size / 24)
  let xray_mat = new BABYLON.StandardMaterial(name + 'mat', scene)
  let fresnel_params = getFresnel()

  xray_mat.emissiveColor = new BABYLON.Color3(1, 1, 1)
  xray_mat.alpha = 0.001
  xray_mat.emissiveFresnelParameters = fresnel_params[0]
  xray_mat.opacityFresnelParameters = fresnel_params[1]
  xray_mat.wireframe = true
  xray_mat.backFaceCulling = false

  let edge_01 = createGroundEdge(name, xray_mat, ground_size, 1, scene)
  let edge_02 = createGroundEdge(name, xray_mat, ground_size, 2, scene)
  let edge_03 = createGroundEdge(name, xray_mat, ground_size, 3, scene)
  let edge_04 = createGroundEdge(name, xray_mat, ground_size, 4, scene)
  let edge_05 = createGroundEdge(name, xray_mat, ground_size, 5, scene)
  let edge_06 = createGroundEdge(name, xray_mat, ground_size, 6, scene)
  let edge_07 = createGroundEdge(name, xray_mat, ground_size, 7, scene)
  let edge_08 = createGroundEdge(name, xray_mat, ground_size, 8, scene)
  let edge_09 = createGroundEdge(name, xray_mat, ground_size, 9, scene)
  let edge_10 = createGroundEdge(name, xray_mat, ground_size, 10, scene)
  let edge_11 = createGroundEdge(name, xray_mat, ground_size, 11, scene)
  let edge_12 = createGroundEdge(name, xray_mat, ground_size, 12, scene)

  let ground_base = createGroundWalls(
    name,
    xray_mat,
    ground_size,
    segments,
    1,
    scene
  )
  let ground_top = createGroundWalls(
    name,
    xray_mat,
    ground_size,
    segments,
    2,
    scene
  )
  let ground_face_01 = createGroundWalls(
    name,
    xray_mat,
    ground_size,
    segments,
    3,
    scene
  )
  let ground_face_02 = createGroundWalls(
    name,
    xray_mat,
    ground_size,
    segments,
    4,
    scene
  )
  let ground_face_03 = createGroundWalls(
    name,
    xray_mat,
    ground_size,
    segments,
    5,
    scene
  )
  let ground_face_04 = createGroundWalls(
    name,
    xray_mat,
    ground_size,
    segments,
    6,
    scene
  )

  ground_face_01.rotation.x = ground_face_02.rotation.x = ground_face_03.rotation.x = ground_face_04.rotation.x = ground_face_03.rotation.z = ground_face_04.rotation.z = edge_03.rotation.y = edge_04.rotation.y = edge_07.rotation.y = edge_08.rotation.y = edge_09.rotation.z = edge_10.rotation.z = edge_11.rotation.z = edge_12.rotation.z =
    -Math.PI / 2

  return {
    ground_base,
    ground_top,
    ground_face_01,
    ground_face_02,
    ground_face_03,
    ground_face_04,
    edge_01,
    edge_02,
    edge_03,
    edge_04,
    edge_05,
    edge_06,
    edge_07,
    edge_08,
    edge_09,
    edge_10,
    edge_11,
    edge_12,
  }
}

export const createSphere = (cell, color, camera, advancedTexture, scene) => {
  let sphere = BABYLON.Mesh.CreateSphere(cell.id, 12, 2.5, scene)
  let fresnel_params = getFresnel()
  sphere.material = new BABYLON.StandardMaterial('myMaterial', scene)
  sphere.material.emissiveColor = color
  sphere.material.alpha = 0.5
  // sphere.material.emissiveFresnelParameters = fresnel_params[0];
  // sphere.material.opacityFresnelParameters = fresnel_params[1];

  sphere.checkCollisions = true
  sphere.animations.push(getAnimationSphere())

  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
    sphere,
    BABYLON.PhysicsImpostor.SphereImpostor,
    {
      mass: 1,
      restitution: -1,
      friction: -1,
    },
    scene
  )
  
  let label = new GUI.Rectangle("label for " + cell.name)
    
  label.background = `rgb(${color.r * 255},${color.g * 255},${color.b * 255})`
  label.height = "30px"
  label.width = "100px"
  label.alpha = 0
  label.isPickable = false
  advancedTexture.addControl(label) 
  label.linkWithMesh(sphere)

  let text1 = new GUI.TextBlock()
  text1.text = cell.name
  text1.color = "white"
  label.addControl(text1)  

  sphere.actionManager = new BABYLON.ActionManager(scene)
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnLeftPickTrigger,
      ((sphere, cell) => {
        let xPos = sphere.position.x
        let yPos =
          sphere.position.y < 0 ? sphere.position.y - 5 : sphere.position.y + 5
        let zPos =
          sphere.position.z < 0
            ? sphere.position.z + 10
            : sphere.position.z - 10
        camera.position = new BABYLON.Vector3(xPos, yPos, zPos)
        camera.setTarget(sphere.position)
      }).bind(this, sphere, cell)
    )
  )  
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      ((sphere) => {
        label.alpha = 0.75
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

const getFresnel = () => {
  var fresnel_params = new BABYLON.FresnelParameters()
  fresnel_params.isEnabled = true
  fresnel_params.leftColor = new BABYLON.Color3(0.25, 0.3, 0.5)
  fresnel_params.rightColor = new BABYLON.Color3(0, 0, 0)
  fresnel_params.power = 1
  fresnel_params.bias = 0.1
  var fresnel_params2 = new BABYLON.FresnelParameters()
  fresnel_params2.isEnabled = true
  fresnel_params2.leftColor = new BABYLON.Color3(0.5, 0.5, 0.5)
  fresnel_params2.rightColor = new BABYLON.Color3(0.1, 0.1, 0.1)
  fresnel_params2.power = 2
  fresnel_params2.bias = 0.5

  return [fresnel_params, fresnel_params2]
}

const createGroundEdge = (name, material, size, index, scene) => {
  let positions = [
    new BABYLON.Vector3(0, -(size / 4), size / 2), //edge_01
    new BABYLON.Vector3(0, -(size / 4), -(size / 2)), //edge_02
    new BABYLON.Vector3(size / 2, -(size / 4), 0), //edge_03
    new BABYLON.Vector3(-(size / 2), -(size / 4)), //edge_04
    new BABYLON.Vector3(0, (size / 4) * 3, size / 2), //edge_05
    new BABYLON.Vector3(0, (size / 4) * 3, -(size / 2)), //edge_06
    new BABYLON.Vector3(size / 2, (size / 4) * 3, 0), //edge_07
    new BABYLON.Vector3(-(size / 2), (size / 4) * 3, 0), //edge_08
    new BABYLON.Vector3(-(size / 2), size / 4, -(size / 2)), //edge_09
    new BABYLON.Vector3(size / 2, size / 4, size / 2), //edge_10
    new BABYLON.Vector3(-(size / 2), size / 4, size / 2), //edge_11
    new BABYLON.Vector3(size / 2, size / 4, -(size / 2)), //edge_12
  ]
  let edge = BABYLON.Mesh.CreateBox(name + 'edge' + index, size, scene)
  edge.material = material
  edge.scaling = new BABYLON.Vector3(1, 0.25 / size, 0.25 / size)
  edge.position = positions[index - 1]
  edge.isPickable = false
  return edge
}

const createGroundWalls = (name, material, size, segments, index, scene) => {
  let positions = [
    new BABYLON.Vector3(0, -(size / 4), 0), //ground_base
    new BABYLON.Vector3(0, (size / 4) * 3, 0), //ground_top
    new BABYLON.Vector3(0, size / 4, size / 2), //ground_face_01
    new BABYLON.Vector3(0, size / 4, -(size / 2)), //ground_face_02
    new BABYLON.Vector3(-(size / 2), size / 4, 0), //ground_face_03
    new BABYLON.Vector3(size / 2, size / 4, 0), //ground_face_04
  ]

  let ground = BABYLON.Mesh.CreateGround(
    name + 'ground' + index,
    size,
    size,
    segments,
    scene,
    true,
    BABYLON.Mesh.DOUBLESIDE
  )
  ground.material = material
  ground.position = positions[index - 1]
  ground.isPickable = false

  return ground
}

export const createEdge = (
  axonId,
  originCellObj,
  targetCellObj,
  totalConnection,
  position,
  color,
  scene
) => {
  let diffValue = (0.1 / totalConnection) * (position + 1)
  let origin =
    totalConnection === 0
      ? new BABYLON.Vector3(
          originCellObj.position.x,
          originCellObj.position.y,
          originCellObj.position.z
        )
      : new BABYLON.Vector3(
          isOdd(position)
            ? originCellObj.position.x + diffValue
            : originCellObj.position.x - diffValue,
          isOdd(position)
            ? originCellObj.position.y + diffValue
            : originCellObj.position.y - diffValue,
          originCellObj.position.z
        )

  let points = BABYLON.Curve3.CreateQuadraticBezier(
    origin,
    getControlPositions(origin, targetCellObj.position),
    targetCellObj.position,
    24
  )

  console.log(points.getPoints())
  let line = BABYLON.MeshBuilder.ExtrudeShape(
    axonId,
    {
      shape: getAxonShape(),
      path: points.getPoints(),
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      updatable: true,
    },
    scene
  )

  line.material = new BABYLON.StandardMaterial('lineMaterial', scene)
  line.material.emissiveColor = color

  return line
}

export const importCenterBrain = (scene) => {
  let centerBrain
  BABYLON.SceneLoader.LoadAssetContainer("/assets/models/", "CX.obj", scene, (assets) => {
    centerBrain=assets.meshes[0]
    centerBrain.scaling = new BABYLON.Vector3(30,30,30)
    assets.addAllToScene()
    
    let animationCenterBrainEnter = new BABYLON.Animation("animationCenterBrainEnter", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    let animationCenterBrainEnterKeys = []
    animationCenterBrainEnterKeys.push({
      frame: 0,
      value: 0
    });
    animationCenterBrainEnterKeys.push({
      frame: 50,
      value: -7.5
    });
    animationCenterBrainEnter.setKeys(animationCenterBrainEnterKeys)
    centerBrain.animations.push(animationCenterBrainEnter)
    scene.beginAnimation(centerBrain, 0, 50, false)
    return centerBrain
  }); 
}