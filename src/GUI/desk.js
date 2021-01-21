import * as GUI from 'babylonjs-gui'
import {
  SUB_HEADER_FONT_SIZE,
  FONT_SIZE,
  BOLD_FONT,
  NORMAL_FONT,
  THINY_FONT,
  SUB_TITLE_FONT_SIZE,
  getTextBox,
  getLabel,
  getLine,
  getGUIDot,
  setMeshActions,
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

export const getGUIDesk = (index, mesh, advancedTexture, scene) => {
  let labelParams = getLabelParams(index)
  let label = getLabel('label-' + mesh.name, labelParams, 1)
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
    texts.mainTextAignment,
    true
  )

  label.addControl(header)
  label.addControl(mainText)
  let line = getLine(`connect-<${label.id}>-to-<${mesh.id}>`, 'black', label, mesh, advancedTexture)
  let endRound = getGUIDot(`dot-connection-<${label.id}>-to-<${mesh.id}>`, '#b00020', mesh, advancedTexture)

  setMeshActions(mesh, label, line, endRound, scene)
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
    { t: 20, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    true
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
