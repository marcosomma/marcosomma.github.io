import * as GUI from 'babylonjs-gui'

const getLabelParams = (fileName) => {
  let params = {}
  switch (fileName) {
    case 'CX':
      params.h = '200px'
      params.w = '800px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
      break
    case 'LX':
      params.h = '250px'
      params.w = '550px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
      break
    case 'RX':
      params.h = '280px'
      params.w = '550px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      break
    default:
      params.h = '350px'
      params.w = '550px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
  }
  return params
}

const getTexts = (fileName) => {
  let text = {
    headerMargins: { t: 5, l: 5 },
    headerAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    mainTextMargins: { t: 30, l: 5 },
    mainTextAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_TOP,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    citMargins: { b: 15, l: 5 },
    citAignment: {
      v: GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
    },
    citAuthMargins: { b: 0, r: 5 },
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
      text.cit =
        'Maecenas mollis eget nulla id tincidunt. Praesent semper iaculis ligula. '
      text.citAuth = 'cit. I Lore'
      break
    case 'LX':
      text.header = 'Right Hemisphere:'
      text.mainText =
        "Responsible for control of the left side of the body, and is the more artistic and creative side of the brain. \nIt's also controlling, Art awareness, Creativity, Imgination, Insight, Holistic thought, Music awareness, 3-D forms and much more..."
      text.cit =
        'Logic will get you from A to B. Imagination will take you everywhere.'
      text.citAuth = 'cit. A.Einstein'
      break
    case 'RX':
      text.header = 'Left Hemisphere:'
      text.mainText =
        "Responsible for control of the right side of the body, and is the more academic and logical side of the brain. \nIt's also controlling, Analytic thought, Logic, Language, Reasoning, Science and math, Written, Numbers skills and much more..."
      text.cit = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
      text.citAuth = 'cit. L Ipsum'
      break
    default:
      text.header = ''
      text.mainText = ''
      text.cit = ''
      text.citAuth = ''
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

export const getGUIBrainPart = (
  fileName,
  importedBrainPart,
  advancedTexture
) => {
  let label = new GUI.Rectangle('label for ' + importedBrainPart.name)
  let labelParams = getLabelParams(fileName)
  label.background = '#f1f1f1'
  label.height = labelParams.h
  label.width = labelParams.w
  label.verticalAlignment = labelParams.verticalAlignment
  label.horizontalAlignment = labelParams.horizontalAlignment
  label.zIndex = 1
  label.top = 80
  label.paddingRight = 150
  label.paddingLeft = 150
  advancedTexture.addControl(label)

  let texts = getTexts(fileName)
  const header = getTextBox(
    texts.header,
    'black',
    500,
    14,
    texts.headerMargins,
    texts.headerAignment
  )
  const mainText = getTextBox(
    texts.mainText,
    'black',
    100,
    12,
    texts.mainTextMargins,
    texts.mainTextAignment
  )
  const cit = getTextBox(
    texts.cit,
    'black',
    100,
    10,
    texts.citMargins,
    texts.citAignment
  )
  const citAuth = getTextBox(
    texts.citAuth,
    'black',
    500,
    9,
    texts.citAuthMargins,
    texts.citAuthAignment
  )

  label.addControl(header)
  label.addControl(mainText)
  label.addControl(cit)
  label.addControl(citAuth)

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
