
let selected = undefined

export const setBtnListeners = (btnCenterBrain, btnLeftBrain, btnRightBrain, back, centerBrain, leftBrain, rightBrain, root) => {
    btnCenterBrain.onPointerEnterObservable.add(() => {
      if(selected) return
      btnCenterBrain.color = "#018786"
      centerBrain.setAlpha(1)
      leftBrain.material.alpha= 0.1
      rightBrain.material.alpha= 0.1
    });
    btnCenterBrain.onPointerOutObservable.add(() => {
      if(selected) return
      btnCenterBrain.color = "black"
      centerBrain.setAlpha(0)
      leftBrain.material.alpha= 1
      rightBrain.material.alpha= 1
    });
    btnCenterBrain.onPointerClickObservable.add(() => {
      if(selected) return
      selected = btnCenterBrain
      root = 'center'
      btnCenterBrain.color = "#018786"
      centerBrain.setAlpha(0)
      centerBrain.material.alpha= 0
      leftBrain.material.alpha= 0
      rightBrain.material.alpha= 0
      btnLeftBrain.color = '#c2c2c2'
      btnRightBrain.color = '#c2c2c2'
      btnCenterBrain.isPickable = false
      btnRightBrain.isPickable = false
      btnLeftBrain.isPickable = false
      back.color = 'black'
    });
    
    btnLeftBrain.onPointerEnterObservable.add(() => {
      if(selected) return
      btnLeftBrain.color = "#018786"
      rightBrain.setAlpha(1)
      centerBrain.material.alpha= 0.1
      leftBrain.material.alpha= 0.1
    })
    btnLeftBrain.onPointerOutObservable.add(() => {
      if(selected) return
      btnLeftBrain.color = "black"
      rightBrain.setAlpha(0)
      centerBrain.material.alpha= 1
      leftBrain.material.alpha= 1
    })
    btnLeftBrain.onPointerClickObservable.add(() => {
      if(selected) return
      selected = btnLeftBrain
      root = 'left'
      btnLeftBrain.color = "#018786"
      rightBrain.setAlpha(0)
      centerBrain.material.alpha= 0
      leftBrain.material.alpha= 0
      rightBrain.material.alpha= 0
      btnCenterBrain.color = '#c2c2c2'
      btnRightBrain.color = '#c2c2c2'
      btnCenterBrain.isPickable = false
      btnRightBrain.isPickable = false
      btnLeftBrain.isPickable = false
      back.color = 'black'
    });
  
    btnRightBrain.onPointerEnterObservable.add(() => {
      if(selected) return
      btnRightBrain.color = "#018786"
      leftBrain.setAlpha(1)
      centerBrain.material.alpha= 0.1
      rightBrain.material.alpha= 0.1
    });
    btnRightBrain.onPointerOutObservable.add(() => {
      if(selected) return
      btnRightBrain.color = "black"
      leftBrain.setAlpha(0)
      centerBrain.material.alpha= 1
      rightBrain.material.alpha= 1
    });
    btnRightBrain.onPointerClickObservable.add(() => {
      if(selected) return
      selected = btnRightBrain
      root = 'right'
      btnRightBrain.color = "#018786"
      leftBrain.setAlpha(0)
      centerBrain.material.alpha= 0
      leftBrain.material.alpha= 0
      rightBrain.material.alpha= 0
      btnCenterBrain.color = '#c2c2c2'
      btnLeftBrain.color = '#c2c2c2'
      btnCenterBrain.isPickable = false
      btnRightBrain.isPickable = false
      btnLeftBrain.isPickable = false
      back.color = 'black'
    });
    back.onPointerClickObservable.add(() => {
      if(!selected) return
      root = ''
      btnCenterBrain.color = 'black'
      btnRightBrain.color = 'black'
      btnLeftBrain.color = 'black'
      centerBrain.material.alpha= 1
      leftBrain.material.alpha= 1
      rightBrain.material.alpha= 1
      btnCenterBrain.isPickable = true
      btnRightBrain.isPickable = true
      btnLeftBrain.isPickable = true
      selected = undefined
      back.color = 'transparent'
    });
  }