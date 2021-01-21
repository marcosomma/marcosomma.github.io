import * as GUI from 'babylonjs-gui'
import {
  HEADER_FONT_SIZE,
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
      params.h = '290px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      break
    case 2:
      params.h = '255px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
      break
    case 3:
      params.h = '600px'
      params.w = '500px'
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
      text.jobs = [
        {
          title: 'Co-founder / Senior FullStack Developer',
          company: 'Abzu.ai',
          description:
            'Abzu is realizing the promise of strong artificial intelligence. We are building a machine where cognition arises from self-organization of millions of cells.',
        },
        {
          title: 'FullStack Developer',
          company: 'Blackwood Seven',
          description:
            'Part of the Barcelona CORE Team, developing the core dashboard product and producing internal mangement tools.',
        },
        {
          title: 'Senior BackEnd Developer',
          company: 'ON - Opportunity Network',
          description:
            'Join at early stages of this start-up to enforce and scale the existing prototype-product to push it to the market',
        },
        {
          title: 'BackEnd Developer',
          company: 'Future Finance',
          description:
            'Join at early stages of this start-up to enforce and scale the existing prototype-product to push it to the market',
        },
        {
          title: 'BackEnd Developer',
          company: 'Skill Soft',
          description:
            'Moving actual E-learning products to Web 2.0, adapting AdobeFlash (ActionScript 2 and 3) contents to JS platform',
        },
        {
          title: 'Consultant Developer',
          company: 'Gec BCN / Tecfa / ANAYA / FANTA Italy and more...',
          description:
            'Developing e-learning contents, videogames, web applications and a lot of more multimedia products.',
        },
      ]
      break
    default:
      text.header = ''
      text.mainText = ''
  }
  return text
}

export const getGUILightHouse = (index, mesh, advancedTexture, scene) => {
  let labelParams = getLabelParams(index)
  let label = getLabel('label-' + mesh.name, labelParams, 1)

  advancedTexture.addControl(label)

  let texts = getTexts(index)
  if (index === 3) {
    const header = getTextBox(
      mesh.name + '_JOB_textBlock',
      'Jobs',
      'black',
      BOLD_FONT,
      HEADER_FONT_SIZE,
      texts.headerMargins,
      texts.headerAignment
    )

    label.addControl(header)
    texts.jobs.forEach((job, i) => {
      let top = 50 * (i + 1)
      const title = getTextBox(
        mesh.name + '_' + i + '_JOB_title_textBlock',
        job.title,
        'black',
        BOLD_FONT,
        SUB_HEADER_FONT_SIZE,
        { ...texts.mainTextMargins, t: texts.mainTextMargins.t * i + top },
        texts.headerAignment
      )
      const company = getTextBox(
        mesh.name + '_' + i + '_JOB_company_textBlock',
        job.company,
        'black',
        NORMAL_FONT,
        FONT_SIZE,
        { ...texts.mainTextMargins, t: texts.mainTextMargins.t * i + 20 + top },
        texts.headerAignment
      )
      const description = getTextBox(
        mesh.name + '_' + i + '_JOB_description_textBlock',
        job.description,
        'black',
        THINY_FONT,
        FONT_SIZE,
        { ...texts.mainTextMargins, t: texts.mainTextMargins.t * i + 40 + top },
        texts.mainTextAignment
      )

      label.addControl(title)
      label.addControl(company)
      label.addControl(description)
    })
  } else {
    const header = getTextBox(
      mesh.name + '_textBlock',
      texts.header,
      'black',
      BOLD_FONT,
      HEADER_FONT_SIZE,
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

    // header.onLinesReadyObservable.addOnce(() => {
    //   header.fontOffset.height = HEADER_FONT_SIZE * 1.8
    // })

    // mainText.onLinesReadyObservable.addOnce(() => {
    //   header.fontOffset.height = FONT_SIZE * 1.8
    // })

    label.addControl(header)
    label.addControl(mainText)
  }
  let line = getLine(`connect-<${label.id}>-to-<${mesh.id}>`, 'black', label, mesh, advancedTexture)
  let endRound = getGUIDot(`dot-connection-<${label.id}>-to-<${mesh.id}>`, '#b00020', mesh, advancedTexture)

  setMeshActions(mesh, label, line, endRound, scene)
}

export const getGUITitleLightHouse = (advancedTexture) => {
  let label = new GUI.Rectangle('lightHOuse-title')
  label.background = 'white'
  label.height = '210px'
  label.width = '410px'
  label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  label.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  label.zIndex = 10
  label.thickness = 0
  label.paddingBottom = 10
  advancedTexture.addControl(label)

  const header = getTextBox(
    'lightHOuse-title_textBlock',
    'CoFounder - Team Lead - Senior FullStack Developer - Ethologist',
    'black',
    BOLD_FONT,
    SUB_TITLE_FONT_SIZE,
    { t: 5, b: 135, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
    }
  )
  const mainText = getTextBox(
    'lightHOuse-title_textBlock',
    "I like to compare great leaders to a lighthouse. \nSteady whatever today's weather. Showing the way, in good and bad times. Seemingly useless when the sea is calm, absolutely vital when a hurricane hits. Not giving orders, but keeping everyone focused on the end goal.",
    'black',
    THINY_FONT,
    HEADER_FONT_SIZE,
    { b: 10, t: 40, l: 10, r: 10 },
    {
      v: GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      h: GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
    }
  )

  label.addControl(header)
  label.addControl(mainText)

  return label
}
