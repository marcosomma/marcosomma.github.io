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
      text.mainText =
        'Tere is not yet a lot to say about it, this is acctually my latest passion/hobby. I start to learn/play with arduino boards in the 2018 and to date I developd several autonomus robot-cars, arms, spiders and mush more.\
        \nI found it a grat application of my engineering skills in ordet to make things that interact phisically with the real world.'
      break
    case 2:
      text.header = 'Video Games'
      text.mainText =
        'The passion developing videogames was a natural path for me. Being a game player singe 7 yars old, the addictio to World of Warcraft that hit me 12 years ago and my developer skill, push me easly to this field. \
      \nThe first videogame that I realize was a IOS game (Mustache) a platafor game about a thief, then as freelancer I keep developing games for differents provider as Fanta Italy (Facebook FantaGame 2013), Anaya and many more. \
      \nIn the last 3 years I use Unity and C# to implement a 3D Visualization af the Abzu tech. I pretty sure that my passion will keep me deeging in thi field! '
      break
    case 3:
      text.header = 'Photography'
      text.mainText =
        "Studing Art at Hight School, photography was one of the main calsses we had. It was not the first time I play with a camara, have also a dad quite addicte to it, helped a lot! He teach me how reveal my photos nad make some old school fashion effect just using paper and light!\
      \n From that time a lot of 'CLICK' was done, I slowly become better photographer and getting more knowledge expecialy in the analogic world.\
      \n I aldo had some solo expositions in BCN, Napoles and on-line. yuc can take a look at my work just clicking on the camera or visiting my Flickr account https://www.flickr.com/people/44158816@N06/"
      break
    case 4:
      text.header = 'Music'
      text.mainText =
        'Coming from a musician family I start to learn about music at early ages, Solfeggio than flute, piano and guitar. \
        \nThan when I was a teenager I realise that this classic music was quite boring so I join a Indie band, It was fun and we had a fear success period, we was also trael around Italy to play in different cities! \
        \nSome of my musician friends become professionals but I decide to left the stage and jut play my miusic for mysefl and my family at home. But I keep having some instrument around also becouse I think that are a real good "cultural" influence for my kids.'
      break
    default:
      text.header = ''
      text.mainText = ''
  }
  return text
}

export const getGUICretivity = (index, mesh, advancedTexture, scene) => {
  let labelParams = {
    h: index !== 1 ? '150px' : '110px',
    w: '800px',
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
  let line = getLine(`connect-<${label.id}>-to-<${mesh.id}>`, 'white', label, mesh, advancedTexture)
  let endRound = getGUIDot(`dot-connection-<${label.id}>-to-<${mesh.id}>`, '#00b020', mesh, advancedTexture)

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
