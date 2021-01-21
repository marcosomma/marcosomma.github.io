import * as GUI from 'babylonjs-gui'

export const TITLE_FONT_SIZE = '32px'
export const SUB_TITLE_FONT_SIZE = '24px'
export const HEADER_FONT_SIZE = '16px'
export const SUB_HEADER_FONT_SIZE = '14px'
export const FONT_SIZE = '12px'
export const BOLD_FONT = 500
export const NORMAL_FONT = 400
export const THINY_FONT = 100

export const getTextBox = (id, text, color, fontWeight, fontSize, margins, alignment, resize) => {
  let textBox = new GUI.TextBlock(id)
  textBox.textWrapping = GUI.TextWrapping.WordWrap
  textBox.fontFamily = 'Roboto'
  textBox.fontWeight = fontWeight
  textBox.fontSize = fontSize
  textBox.color = color
  textBox.text = text
  textBox.lineWidth = fontSize
  if (resize) textBox.resizeToFit = true
  if (margins.t) textBox.paddingTop = margins.t
  if (margins.b) textBox.paddingBottom = margins.b
  if (margins.r) textBox.paddingRight = margins.r
  if (margins.l) textBox.paddingLeft = margins.l
  if (alignment) {
    textBox.textVerticalAlignment = alignment.v
    textBox.textHorizontalAlignment = alignment.h
  }
  return textBox
}

export const getLabel = (id, labelParams, zIndex, topMargin = 80) => {
  let label = new GUI.Rectangle(id)
  label.background = '#f1f1f1'
  label.height = labelParams.h
  label.width = labelParams.w
  label.verticalAlignment = labelParams.verticalAlignment
  label.horizontalAlignment = labelParams.horizontalAlignment
  label.zIndex = zIndex
  label.top = topMargin
  label.alpha = 0
  return label
}

export const getLine = (id, color, label, mesh, advancedTexture) => {
  let line = new GUI.Line(id)
  line.lineWidth = 1
  line.color = color
  advancedTexture.addControl(line)
  line.linkWithMesh(mesh)
  line.connectedControl = label
  line.alpha = 0
  return line
}

export const getGUIDot = (id, color, mesh, advancedTexture) => {
  let endRound = new GUI.Ellipse(id)
  endRound.width = '20px'
  endRound.background = color
  endRound.height = '20px'
  endRound.color = 'black'
  endRound.thickness = 1
  endRound.alpha = 0.5
  advancedTexture.addControl(endRound)
  endRound.linkWithMesh(mesh)
  return endRound
}

export const setMeshActions = (mesh, label, line, endRound, scene) => {
  mesh.isPickable = true
  mesh.actionManager = new BABYLON.ActionManager(scene)
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, endRound, 'alpha', 1, 100)
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, endRound, 'thickness', 2, 100)
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, label, 'alpha', 1, 100)
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, line, 'alpha', 1, 100)
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, endRound, 'alpha', 0.5, 100)
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, endRound, 'thickness', 1, 100)
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, label, 'alpha', 0, 100)
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, line, 'alpha', 0, 100)
  )
  mesh.onDisposeObservable.add(() => {
    endRound.dispose()
    line.dispose()
    label.dispose()
  })
}
