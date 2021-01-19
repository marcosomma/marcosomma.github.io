import * as BABYLON from 'babylonjs'

export const loadAssets = (scene, callback) => {
  let assetsManager = new BABYLON.AssetsManager(scene)
  assetsManager.addImageTask('robot task', 'assets/models/texture/cb_diff_06.jpg')
  assetsManager.addImageTask('yashica task', 'assets/models/texture/Yashica.png')
  assetsManager.addImageTask('grass task', 'assets/texture/grass.jpg    ')
  assetsManager.addImageTask('lava task', 'assets/texture/lava.jpg')
  assetsManager.addImageTask('smoke task', 'assets/texture/smoke.png')
  assetsManager.addImageTask('Water_001_NORM task', 'assets/texture/water/Water_001_NORM.jpg')
  assetsManager.addMeshTask('creative_2.obj task', 'creative_2.obj', 'assets/models/creative_2.obj')
  assetsManager.addMeshTask('Creative.obj task', 'Creative.obj', 'assets/models/Creative.obj')
  assetsManager.addMeshTask('CX.obj task', 'CX.obj', 'assets/models/CX.obj')
  assetsManager.addMeshTask('Desk_new.obj task', 'Desk_new.obj', 'assets/models/Desk_new.obj')
  assetsManager.addMeshTask('Desk_or.obj task', 'Desk_or.obj', 'assets/models/Desk_or.obj')
  assetsManager.addMeshTask('Desk.obj task', 'Desk.obj', 'assets/models/Desk.obj')
  assetsManager.addMeshTask('Lighthouse.obj task', 'Lighthouse.obj', 'assets/models/Lighthouse.obj')
  assetsManager.addMeshTask('LX.obj task', 'LX.obj', 'assets/models/LX.obj')
  assetsManager.addMeshTask('RX.obj task', 'RX.obj', 'assets/models/RX.obj')

  assetsManager.onFinish = (tasks) => {
    console.log('Ended all tasks:', tasks)
    callback()
  }
  assetsManager.onProgress = (left, total) => {
    console.log(`AssetsManager tasks ${total - left}/${total}`)
  }

  assetsManager.load()
}
