import * as GUI from 'babylonjs-gui'
import { NORMAL_FONT, FONT_SIZE } from './common'

export const getGUILoading = (advancedTexture) => {
  let Loading = new GUI.StackPanel('LoadingPanel')
  Loading.zIndex = 1000
  Loading.height = '40px'
  Loading.width = '100px'
  Loading.background = 'white'
  Loading.fontFamily = 'Roboto'
  Loading.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
  Loading.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
  Loading.thickness = 1

  let text = new GUI.TextBlock('loading', 'Building Mesh ...')
  text.zIndex = 31
  text.color = 'black'
  text.fontFamily = 'Roboto'
  text.fontWeight = NORMAL_FONT
  text.fontSize = FONT_SIZE
  text.heightInPixels = 40
  text.lineWidth = NORMAL_FONT
  text.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
  text.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER

  text.onLinesReadyObservable.addOnce(() => {
    text.fontOffset.height = FONT_SIZE * 1.5
  })

  Loading.addControl(text)
  advancedTexture.addControl(Loading)

  return Loading
}
