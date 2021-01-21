import * as GUI from 'babylonjs-gui'
import {
  SUB_HEADER_FONT_SIZE,
  FONT_SIZE,
  BOLD_FONT,
  THINY_FONT,
  SUB_TITLE_FONT_SIZE,
  getTextBox,
  getLabel,
  getLine,
  getGUIDot,
  setMeshActions,
} from './common'

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
      text.header = 'Robotic'
      text.mainText = ''
      break
    case 2:
      text.header = 'Video Games'
      text.mainText = ''
      break
    case 3:
      text.header = 'Photography'
      text.mainText = ''
      break
    case 4:
      text.header = 'Music'
      text.mainText = ''
      break
    default:
      text.header = ''
      text.mainText = ''
  }
  return text
}

export const getGUICretivity = (index, mesh, advancedTexture, scene) => {
  let labelParams = {
    h: '200px',
    w: '600px',
    verticalAlignment: GUI.Control.VERTICAL_ALIGNMENT_TOP,
    horizontalAlignment: GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
  }
  let label = getLabel('label-' + mesh.name, labelParams, 1, 0)
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

export const getGUITitleCreativity = (scene, advancedTexture) => {
  let label = new GUI.Rectangle('Creativity-title')
  label.background = 'white'
  label.height = '140px'
  label.width = '800px'
  label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
  label.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
  label.zIndex = 10
  label.thickness = 0
  advancedTexture.addControl(label)

  const header = getTextBox(
    'Creativity-title_textBlock',
    'Multipotentiality',
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
    'Creativity-title_textBlock',
    'Multipotentiality is an educational and psychological term referring to the ability and preference of a person, particularly one of strong intellectual or artistic curiosity, to excel in two or more different fields.\
    \nIt can also refer to an individual whose interests span multiple fields or areas, rather than being strong in just one. Such traits are called multipotentialities, while "multipotentialites" has been suggested as a name for those with this trait.',
    'black',
    THINY_FONT,
    SUB_HEADER_FONT_SIZE,
    { t: 50, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    true
  )

  label.addControl(header)
  label.addControl(mainText)

  return [label]
}
