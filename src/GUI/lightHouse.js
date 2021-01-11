import * as GUI from 'babylonjs-gui'

const getLabelParams = (index) => {
  let params = {}
  switch (index) {
    case 1:
      params.h = '330px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      break
    case 2:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
      break
    case 3:
      params.h = '550px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      break
    default:
      params.h = '350px'
      params.w = '800px'
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
      text.header = 'Bio'
      text.mainText =
        "Born in 1979 in Gragnano (the city of the real Italian pasta), from 2009 I'm floating around Europe, now living in Barcelona. \
            \nFascinated by the concept behind the Teal Organisation, I’m also a fervent supporter of it. I deeply believe that the best way for a company to succeed is to have people that strongly feel the ownership of the product that they are developing. \
            \nFrom 2012 to 2017 I have been joining startups since the early stages. Then in 2018 together with some ex coworkers I found ABZU.AI. Currently looking for new challenges! \
            \nI consider myself a creative programmer, with a strong ability of converting ideas into prototypes and of course, the knowledge to develop them until the final product. \
            \nI love spending my free time with my family, my 3 kids and my lovely wife. I’m also bike addicted, so I try to match those two things… and it is not alway easy. \
            \nBut, let me tell you a secret, when everyone is sleeping I love inventing robots with Arduino shhhhh."
      break
    case 2:
      text.header = 'Background'
      text.mainText =
        'I graduated in Veterinary and I also got a Master’s Degree in Ethology. A little later, around  2008-2009, a global economic crisis happened, PANIC everywhere!\
            \nBack then I was 29 and I just moved to Barcelona (Spain). At that time I didn’t know the language or anyone in Barcelona so I started to accept any kind of job. For a while I was a waiter, a pet sitter, a dog trainer, and then a web developer. At this point you should be thinking..what? Didn’t you study about animals? How and when did you learn about web development? \
            \nWell, all fair questions and the answer is very simple.. since I was a little kid I’ve always been attracted to computers, I loved to play videogames and drawings. So when I decided to start from scratch in a new country, I also realized that maybe It was time for me to take new and unexpected professional paths. Actually, maybe, I have to thank the 2009 economic crisis if I start to learn about web and software development on my own.'
      break
    case 3:
      text.header = 'Job experiences'
      text.mainText =
        "Responsible for control of the right side of the body, and is the more academic and logical side of the brain. \nIt's also controlling, Analytic thought, Logic, Language, Reasoning, Science and math, Written, Numbers skills and much more..."
      break
    default:
      text.header = ''
      text.mainText = ''
  }
  return text
}

const getTextBox = (
  id,
  text,
  color,
  fontWeight,
  fontSize,
  margins,
  alignment
) => {
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

export const getGUILightHouse = (index, mesh, advancedTexture, scene) => {
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
    500,
    14,
    texts.headerMargins,
    texts.headerAignment
  )
  const mainText = getTextBox(
    mesh.name + '_textBlock',
    texts.mainText,
    'black',
    100,
    12,
    texts.mainTextMargins,
    texts.mainTextAignment
  )

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
  endRound.background = 'white'
  endRound.height = '20px'
  endRound.color = 'black'
  endRound.thickness = 1
  endRound.alpha = 0.5
  advancedTexture.addControl(endRound)
  endRound.linkWithMesh(mesh)

  mesh.isPickable = true
  mesh.actionManager = new BABYLON.ActionManager(scene)
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      endRound,
      'alpha',
      1,
      100
    )
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      endRound,
      'thickness',
      2,
      100
    )
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      label,
      'alpha',
      1,
      100
    )
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      line,
      'alpha',
      1,
      100
    )
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      endRound,
      'alpha',
      0.5,
      100
    )
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      endRound,
      'thickness',
      1,
      100
    )
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      label,
      'alpha',
      0,
      100
    )
  )
  mesh.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      line,
      'alpha',
      0,
      100
    )
  )
  mesh.onDisposeObservable.add(() => {
    endRound.dispose()
    line.dispose()
    label.dispose()
  })
}

export const getGUITitleLightHouse = (advancedTexture) => {
  let label = new GUI.Rectangle('lightHOuse-title')
  label.background = 'transparent'
  label.height = '200px'
  label.width = '380px'
  label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  label.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  label.zIndex = 10
  label.thickness = 0
  label.paddingBottom = 10
  advancedTexture.addControl(label)

  const header = getTextBox(
    'lightHOuse-title_textBlock',
    'CoFounder - Team Lead - Senior Software Engineer - Ethologist',
    'black',
    500,
    20,
    { t: 5, b: 120, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
    }
  )
  const mainText = getTextBox(
    'lightHOuse-title_textBlock',
    "I like to compare great leaders to a lighthouse. Steady whatever today's weather. Showing the way, in good and bad times. Seemingly useless when the sea is calm, absolutely vital when a hurricane hits. Not giving orders, but keeping everyone focused on the end goal.",
    'black',
    100,
    14,
    { b: 5, t: 30, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
    }
  )

  label.addControl(header)
  label.addControl(mainText)

  return label
}
