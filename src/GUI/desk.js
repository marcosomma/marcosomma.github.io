import * as GUI from 'babylonjs-gui'
import {
  HEADER_FONT_SIZE,
  SUB_HEADER_FONT_SIZE,
  FONT_SIZE,
  BOLD_FONT,
  NORMAL_FONT,
  THINY_FONT,
  TITLE_FONT_SIZE,
  SUB_TITLE_FONT_SIZE,
} from './common'

const getLabelParams = (index) => {
  let params = {}
  switch (index) {
    case 1:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
      break
    case 2:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      break
    case 3:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
      break
    case 4:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      break
    case 5:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
      break
    case 6:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
      break
    default:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
  }
  return params
}

const getTexts = (index) => {
  let text = {
    headerMargins: { t: 10, l: 10, r: 10 },
    headerAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    mainTextMargins: { t: 40, l: 10, r: 10 },
    mainTextAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
  }
  switch (index) {
    case 1:
      text.header = 'Front-End & VideoGames'
      text.mainText = ''
      break
    case 2:
      text.header = 'Back-End & Infrastructure'
      text.mainText = ''
      break
    case 3:
      text.header = 'Back-End & Infrastructure Skills'
      text.mainText = ''
      break
    case 4:
      text.header = 'Front-End & VideoGames Skills'
      text.mainText = ''
      break
    case 5:
      text.header = 'Certificates'
      text.mainText = ''
      break
    case 6:
      text.header = 'Projects'
      text.mainText = ''
      break
    default:
      text.header = ''
      text.mainText = ''
  }
  return text
}

const getTextBox = (id, text, color, fontWeight, fontSize, margins, alignment) => {
  let textBox = new GUI.TextBlock(id)
  textBox.textWrapping = GUI.TextWrapping.WordWrap
  textBox.fontFamily = 'Roboto'
  textBox.fontWeight = fontWeight
  textBox.fontSize = fontSize
  textBox.color = color
  textBox.text = text
  if (margins.t) textBox.paddingTop = margins.t
  if (margins.b) textBox.paddingBottom = margins.b
  if (margins.r) textBox.paddingRight = margins.r
  if (margins.l) textBox.paddingLeft = margins.l
  textBox.textVerticalAlignment = alignment.v
  textBox.textHorizontalAlignment = alignment.h
  return textBox
}

export const getGUIDesk = (index, mesh, advancedTexture, scene) => {
  let label = new GUI.Rectangle('label for ' + mesh.name)
  let labelParams = getLabelParams(index)
  label.background = '#f1f1f1'
  label.height = labelParams.h
  label.width = labelParams.w
  label.verticalAlignment = labelParams.verticalAlignment
  label.horizontalAlignment = labelParams.horizontalAlignment
  label.zIndex = 1
  label.top = 80
  label.alpha = 0
  advancedTexture.addControl(label)

  let texts = getTexts(index)
  const header = getTextBox(
    mesh.name + '_textBlock',
    texts.header,
    'black',
    BOLD_FONT,
    SUB_HEADER_FONT_SIZE,
    texts.headerMargins,
    texts.headerAignment
  )
  const mainText = getTextBox(
    mesh.name + '_textBlock',
    texts.mainText,
    'black',
    THINY_FONT,
    FONT_SIZE,
    texts.mainTextMargins,
    texts.mainTextAignment
  )

  header.onLinesReadyObservable.addOnce(() => {
    header.fontOffset.height = SUB_HEADER_FONT_SIZE * 1.8
  })

  mainText.onLinesReadyObservable.addOnce(() => {
    header.fontOffset.height = FONT_SIZE * 1.8
  })

  label.addControl(header)
  label.addControl(mainText)

  let line = new GUI.Line()
  line.lineWidth = 1
  line.color = 'black'
  advancedTexture.addControl(line)
  line.linkWithMesh(mesh)
  line.connectedControl = label
  line.alpha = 0

  let endRound = new GUI.Ellipse()
  endRound.width = '20px'
  endRound.background = '#018786'
  endRound.height = '20px'
  endRound.color = 'black'
  endRound.thickness = 1
  endRound.alpha = 0.4
  advancedTexture.addControl(endRound)
  endRound.linkWithMesh(mesh)

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

export const getGUITitleDesk = (scene, advancedTexture) => {
  let label = new GUI.Rectangle('Desk-title')
  label.background = 'white'
  label.height = '90px'
  label.width = '400px'
  label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  label.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
  label.zIndex = 10
  label.thickness = 0
  advancedTexture.addControl(label)

  const header = getTextBox(
    'Desk-title_textBlock',
    'Senior FullStack Developer',
    'black',
    BOLD_FONT,
    SUB_TITLE_FONT_SIZE,
    { t: 10, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
    }
  )
  const mainText = getTextBox(
    'Desk-title_textBlock',
    'A person who never made a mistake never tried anything new',
    'black',
    THINY_FONT,
    SUB_HEADER_FONT_SIZE,
    { t: 40, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    }
  )
  const citText = getTextBox(
    'Desk-title_textBlock',
    'Cit. Albert Einstaein',
    'black',
    NORMAL_FONT,
    FONT_SIZE,
    { t: 65, l: 10, r: 20 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
    }
  )

  label.addControl(header)
  label.addControl(mainText)
  label.addControl(citText)

  return [label]
}
