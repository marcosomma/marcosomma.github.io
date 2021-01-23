import * as GUI from 'babylonjs-gui'
import { FONT_SIZE, NORMAL_FONT, THINY_FONT, TITLE_FONT_SIZE, SUB_TITLE_FONT_SIZE } from './common'

export const getGUILandingPage = (advancedTexture) => {
  let panelBorder = new GUI.StackPanel('borderMainStackPanel')
  panelBorder.zIndex = 999
  panelBorder.height = '282px'
  panelBorder.width = '282px'
  panelBorder.background = 'black'
  panelBorder.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
  panelBorder.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  panelBorder.thickness = 0
  advancedTexture.addControl(panelBorder)

  let panel = new GUI.StackPanel('mainStackPanel')
  panel.zIndex = 1000
  panel.height = '280px'
  panel.width = '280px'
  panel.background = 'white'
  panel.fontFamily = 'Roboto'
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  panel.thickness = 0

  let preHeader = new GUI.TextBlock('title1', 'Welcome to')
  preHeader.zIndex = 30
  preHeader.color = 'black'
  preHeader.fontFamily = 'Roboto'
  preHeader.fontWeight = THINY_FONT
  preHeader.fontSize = TITLE_FONT_SIZE
  preHeader.heightInPixels = 40
  preHeader.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  preHeader.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  preHeader.paddingRight = 10

  let header = new GUI.TextBlock('title2', "Marco's brain")
  header.zIndex = 31
  header.color = 'black'
  header.fontFamily = 'Roboto'
  header.fontWeight = NORMAL_FONT
  header.fontSize = TITLE_FONT_SIZE
  header.heightInPixels = 40
  header.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
  header.paddingLeft = 10

  let btnCenterBrain = new GUI.Button.CreateSimpleButton('menu-Experiences', 'Experiences')
  btnCenterBrain.zIndex = 40
  btnCenterBrain.color = 'black'
  btnCenterBrain.fontFamily = 'Roboto'
  btnCenterBrain.fontWeight = THINY_FONT
  btnCenterBrain.fontSize = SUB_TITLE_FONT_SIZE
  btnCenterBrain.heightInPixels = 60
  btnCenterBrain.paddingTop = 30
  btnCenterBrain.paddingLeft = 130
  btnCenterBrain.paddingRight = 0
  btnCenterBrain.thickness = 0

  let btnRightBrain = new GUI.Button.CreateSimpleButton('menu-Programming', 'Programming')
  btnRightBrain.zIndex = 40
  btnRightBrain.color = 'black'
  btnRightBrain.fontFamily = 'Roboto'
  btnRightBrain.fontWeight = THINY_FONT
  btnRightBrain.fontSize = SUB_TITLE_FONT_SIZE
  btnRightBrain.heightInPixels = 30
  btnRightBrain.paddingLeft = 115
  btnRightBrain.paddingRight = 0
  btnRightBrain.thickness = 0

  let btnLeftBrain = new GUI.Button.CreateSimpleButton('menu-Creativity', 'Creativity')
  btnLeftBrain.zIndex = 40
  btnLeftBrain.color = 'black'
  btnLeftBrain.fontFamily = 'Roboto'
  btnLeftBrain.fontWeight = THINY_FONT
  btnLeftBrain.fontSize = SUB_TITLE_FONT_SIZE
  btnLeftBrain.heightInPixels = 30
  btnLeftBrain.paddingLeft = 155
  btnLeftBrain.paddingRight = 0
  btnLeftBrain.thickness = 0

  let back = new GUI.Button.CreateSimpleButton('menu-Back', '< Back')
  back.zIndex = 40
  back.color = 'transparent'
  back.fontFamily = 'Roboto'
  back.fontWeight = NORMAL_FONT
  back.fontSize = SUB_TITLE_FONT_SIZE
  back.heightInPixels = 30
  back.paddingLeft = 0
  back.paddingRight = 0
  back.thickness = 0

  let contacts = new GUI.Button.CreateSimpleButton('marcosomma.work@gmail.com', 'marcosomma.work@gmail.com')
  contacts.zIndex = 43
  contacts.color = 'black'
  contacts.fontFamily = 'Roboto'
  contacts.fontWeight = THINY_FONT
  contacts.fontSize = FONT_SIZE
  contacts.heightInPixels = 50
  contacts.paddingTop = 30
  contacts.thickness = 0
  contacts.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  contacts.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
  contacts.onPointerEnterObservable.add((event) => {
    contacts.color = '#018786'
  })
  contacts.onPointerOutObservable.add((event) => {
    contacts.color = 'black'
  })
  contacts.onPointerClickObservable.add((event) => {
    window.location.href = 'mailto:marcosomma.work@gmail.com?subject=Contact[marcosomma.gihub.io]'
  })

  panel.addControl(preHeader)
  panel.addControl(header)
  panel.addControl(btnCenterBrain)
  panel.addControl(btnRightBrain)
  panel.addControl(btnLeftBrain)
  panel.addControl(back)
  panel.addControl(contacts)
  panelBorder.addControl(panel)

  const hideMenu = () => {
    panelBorder.height = '232px'
    panelBorder.width = '100px'
    panel.height = '230px'
    panel.width = '98px'
    panelBorder.top = -200
  }

  const showMenu = () => {
    panelBorder.height = '282px'
    panelBorder.width = '282px'
    panel.height = '280px'
    panel.width = '280px'
    panelBorder.top = 0
  }

  return {
    panelBorder,
    btnCenterBrain,
    btnLeftBrain,
    btnRightBrain,
    back,
    hideMenu,
    showMenu,
  }
}
