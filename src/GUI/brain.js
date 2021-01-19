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

const getLabelParams = (fileName) => {
  let params = {}
  switch (fileName) {
    case 'CX':
      params.h = '95px'
      params.w = '550px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
      break
    case 'LX':
      params.h = '155px'
      params.w = '420px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
      params.paddingRight = 150
      break
    case 'RX':
      params.h = '155px'
      params.w = '420px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      params.paddingLeft = 150
      break
    default:
      params.h = '340px'
      params.w = '550px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
  }
  return params
}

const getTexts = (fileName) => {
  let text = {
    headerMargins: { t: 5, l: 10, r: 10 },
    headerAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    mainTextMargins: { t: 30, l: 10, r: 10 },
    mainTextAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    citMargins: { b: 15, l: 10, r: 10 },
    citAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    citAuthMargins: { b: 0, l: 10, r: 10 },
    citAuthAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
    },
  }
  switch (fileName) {
    case 'CX':
      text.header = 'Amygdala, Hippocampus, Thalamus and Hypothalamus'
      text.mainText =
        'The amygdala is the emotion center of the brain, while the hippocampus plays an essential role in the formation of new memories about past experiences. The thalamus and hypothalamus are associated with changes in emotional reactivity.'
      break
    case 'LX':
      text.header = 'Right Hemisphere:'
      text.mainText =
        "Responsible for control of the left side of the body, and is the more artistic and creative side of the brain. \nIt's also controlling, Art awareness, Creativity, Imgination, Insight, Holistic thought, Music awareness, 3-D forms and much more..."
      break
    case 'RX':
      text.header = 'Left Hemisphere:'
      text.mainText =
        "Responsible for control of the right side of the body, and is the more academic and logical side of the brain. \nIt's also controlling, Analytic thought, Logic, Language, Reasoning, Science and math, Written, Numbers skills and much more..."
      break
    default:
      text.header = ''
      text.mainText = ''
  }
  return text
}

const getTextBox = (text, color, fontWeight, fontSize, margins, alignment) => {
  let textBox = new GUI.TextBlock()
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

export const getGUIBrainPart = (fileName, importedBrainPart, advancedTexture) => {
  let label = new GUI.Rectangle('label for ' + importedBrainPart.name)
  let labelParams = getLabelParams(fileName)
  label.background = '#f1f1f1'
  label.height = labelParams.h
  label.width = labelParams.w
  label.verticalAlignment = labelParams.verticalAlignment
  label.horizontalAlignment = labelParams.horizontalAlignment
  label.zIndex = 1
  label.top = 80
  if (labelParams.paddingRight) label.paddingRight = labelParams.paddingRight
  if (labelParams.paddingLeft) label.paddingLeft = labelParams.paddingLeft
  advancedTexture.addControl(label)

  let texts = getTexts(fileName)
  const header = getTextBox(
    texts.header,
    'black',
    BOLD_FONT,
    SUB_HEADER_FONT_SIZE,
    texts.headerMargins,
    texts.headerAignment
  )
  const mainText = getTextBox(
    texts.mainText,
    'black',
    THINY_FONT,
    FONT_SIZE,
    texts.mainTextMargins,
    texts.mainTextAignment
  )

  label.addControl(header)
  label.addControl(mainText)

  let line = new GUI.Line()
  line.lineWidth = 1
  line.dash = [5, 5]
  line.color = 'black'
  advancedTexture.addControl(line)
  line.linkWithMesh(importedBrainPart)
  line.connectedControl = label

  let endRound = new GUI.Ellipse()
  endRound.width = '20px'
  endRound.background = 'white'
  endRound.height = '20px'
  endRound.color = 'black'
  endRound.thickness = 2
  advancedTexture.addControl(endRound)
  endRound.linkWithMesh(importedBrainPart)

  return {
    label,
    line,
    endRound,
  }
}
