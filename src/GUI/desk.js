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
      params.h = '330px'
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
      params.h = '550px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
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

export const getGUITitleDesk = (scene, advancedTexture) => {
  let label = new GUI.Rectangle('Desk-title')
  label.background = 'transparent'
  label.height = '200px'
  label.width = '400px'
  label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  label.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
  label.zIndex = 10
  label.thickness = 0
  advancedTexture.addControl(label)

  const header = getTextBox(
    'Desk-title_textBlock',
    'Senior Software Engineer',
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

  var font_size = 20
  var font = font_size + 'px Roboto'
  var planeHeight = 0.5

  var DTHeight = 1.5 * font_size

  var ratio = planeHeight / DTHeight
  var textFront = 'FrontEnd & Videogames'
  var textBack = 'Backend & Infrastructure'
  var textMain = "Marco's desk"
  var temp = new BABYLON.DynamicTexture('DynamicTexture', 64, scene)
  var tmpctx = temp.getContext()
  tmpctx.font = font
  var DTWidth = tmpctx.measureText(textFront).width + 8
  var planeWidth = DTWidth * ratio
  var dynamicTextureFront = new BABYLON.DynamicTexture(
    'dynamicTextureFront',
    { width: DTWidth, height: DTHeight },
    scene,
    false
  )
  var matFront = new BABYLON.StandardMaterial('mat', scene)
  matFront.backFaceCulling = false
  matFront.diffuseTexture = dynamicTextureFront
  dynamicTextureFront.drawText(
    textFront,
    null,
    null,
    font,
    '#000000',
    '#ffffff',
    true
  )
  var planeFront = BABYLON.MeshBuilder.CreatePlane(
    'plane',
    { width: planeWidth, height: planeHeight },
    scene
  )
  planeFront.material = matFront
  planeFront.rotation.y = Math.PI / 2
  planeFront.position.x = -0.2
  planeFront.position.y = 6.2
  planeFront.position.z = 4

  var dynamicTextureMain = new BABYLON.DynamicTexture(
    'dynamicTextureMain',
    { width: DTWidth, height: DTHeight },
    scene,
    false
  )
  var matMain = new BABYLON.StandardMaterial('mat', scene)
  matMain.backFaceCulling = false
  matMain.diffuseTexture = dynamicTextureMain
  dynamicTextureMain.drawText(
    textBack,
    null,
    null,
    font,
    '#000000',
    '#ffffff',
    true
  )
  var planeBack = BABYLON.MeshBuilder.CreatePlane(
    'plane',
    { width: planeWidth, height: planeHeight },
    scene
  )
  planeBack.material = matMain
  planeBack.rotation.y = -Math.PI / 2
  planeBack.position.x = 0.04
  planeBack.position.y = 6.2
  planeBack.position.z = 4

  var dynamicTextureMain = new BABYLON.DynamicTexture(
    'dynamicTextureMain',
    { width: DTWidth, height: DTHeight },
    scene,
    false
  )
  var matMain = new BABYLON.StandardMaterial('mat', scene)
  matMain.diffuseTexture = dynamicTextureMain
  dynamicTextureMain.drawText(
    textMain,
    null,
    null,
    font,
    '#000000',
    '#ffffff',
    true
  )
  var planeMain = BABYLON.MeshBuilder.CreatePlane(
    'plane',
    { width: planeWidth, height: planeHeight },
    scene
  )
  planeMain.material = matMain
  planeMain.rotation.y = Math.PI
  planeMain.position.x = 0
  planeMain.position.y = 5.1
  planeMain.position.z = 6.2
  return [planeFront, planeBack, planeMain, label]
}
