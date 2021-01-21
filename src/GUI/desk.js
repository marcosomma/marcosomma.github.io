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
      params.h = '225px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
      break
    case 2:
      params.h = '190px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      break
    case 3:
      params.h = '140px'
      params.w = '840px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
      break
    default:
      params.h = '280px'
      params.w = '600px'
      params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
      params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
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
      text.mainText =
        "More than 18 years of experience of HTML and CSS, of course I'm up to date with HTM5 and CSS3 :). I also have 10 years of experience using Javascript, lately useing to ES6 and frameworks like React, BabylonJs and others.\
      \nI also have some experience developing videogames. At the begin of my carrear I was producing Multimedias Contents for Kid's books, mostly in Flash and ActionScript. Then I get interested in Apple IOS (ObjectiveC) world so I produce a couple of classic Arcade games and try to sell them trhought AppleStore, but I wast a succes :).\
      \n I Lately get back this passion, mainly using Unity3D to Visualize complex systems and make them easly understandable. Experience leading teams (between 3-8 peoples)"
      break
    case 2:
      text.header = 'Back-End & Infrastructure'
      text.mainText =
        "Partecipating in several project designing and implementing Web and Software infrastructure, I'm latelly getting interested in handling infrastructur clusters using Docker and Kubernates.\
      \nMostly utilizing Python and Javascript for the backend I'm also quite familiar to tecnologies like RabbitMQ, ElasticSearch, MongoDB, GraphQl. Utilizing mostly Cloud services like AWS (Amazon) and GCP (Google), I alwais like to have CI/CD system in place using CircleCI or GitHub Pipelines.\
      \nI'm also used to be on charge of the BFF (Backend For Frontend) collecting data from different endpoint and serving them trought RestAPI's. Experience leading teams (between 3-8 peoples)"
      break
    case 3:
      text.header = 'Latest certificates'
      text.certificates = [
        {
          title: 'UDEMI: AWS Certified Developer Associate',
          date: '02/2021',
          url: 'IN PROGRESS',
        },
        {
          title: 'UDEMI: Blender Modeling',
          date: '01/2021',
          url: 'https://www.udemy.com/certificate/UC-e11da2cf-af73-411b-ae67-4e441975bdbc/',
        },
        {
          title: 'UDEMI: Docker and Kubernates',
          date: '12/2020',
          url: 'https://www.udemy.com/certificate/UC-e11da2cf-af73-411b-ae67-4e441975bdbc/',
        },
        {
          title: 'UDEMI: Unity3D Master Class - Avanced C#',
          date: '11/2020',
          url: 'https://www.udemy.com/certificate/UC-e11da2cf-af73-411b-ae67-4e441975bdbc/',
        },
      ]
      break
    default:
      text.header = ''
      text.mainText = ''
  }
  return text
}

export const getGUIDesk = (index, mesh, advancedTexture, scene) => {
  let labelParams = getLabelParams(index)
  let label = getLabel('label-' + mesh.name, labelParams, 1, 0)
  advancedTexture.addControl(label)

  let texts = getTexts(index)
  if (index !== 3) {
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
  } else {
    const header = getTextBox(
      mesh.name + '_CERTIFICATES_textBlock',
      texts.header,
      'black',
      BOLD_FONT,
      HEADER_FONT_SIZE,
      texts.headerMargins,
      texts.headerAignment
    )

    label.addControl(header)
    texts.certificates.forEach((certificate, i) => {
      // let top = 10
      let certificateLine = getTextBox(
        mesh.name + '_' + i + '_CERTIFICATES_certificateLine_textBlock',
        `${certificate.date} - ${certificate.title} - Certification URL: ${certificate.url}`,
        'black',
        THINY_FONT,
        FONT_SIZE,
        { ...texts.mainTextMargins, t: (i + 1.5) * 10 * 2.5 },
        texts.mainTextAignment
      )

      label.addControl(certificateLine)
    })
  }

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
