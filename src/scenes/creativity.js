import * as BABYLON from 'babylonjs'
import { NIGHT_DARK } from '../common/colors'

export const createEnvironment = (scene) =>
  new Promise((resolve, reject) => {
    resolve({ meshes: [] })
  }).catch((e) => {
    console.log('desk catch error', e)
  })
