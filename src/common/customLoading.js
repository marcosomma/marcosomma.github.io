BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  if (document.getElementById('customLoadingScreenDiv')) {
    // Do not add a loading screen if there is already one
    document.getElementById('customLoadingScreenDiv').style.display = 'initial'
    return
  }
  this._loadingDiv = document.createElement('div')
  this._loadingDiv.id = 'customLoadingScreenDiv'
  this._loadingDiv.innerHTML =
    'Welcome to Marco Somma personal page.<br/><br/><hr/>Please wait a second,<br/> we are loading Meshes, Texture, Fonts and much more...'
  var customLoadingScreenCss = document.createElement('style')
  customLoadingScreenCss.type = 'text/css'
  customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        position: absolute;
        padding-top: 130px;
        background-color: #fff;
        color: black;
        font-size:20px;
        font-family: Roboto !important;
        font-weight: 100;
        text-align:center;
    }
    `
  document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss)
  this._resizeLoadingUI()
  window.addEventListener('resize', this._resizeLoadingUI)
  document.body.appendChild(this._loadingDiv)
}

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = () => {
  document.getElementById('customLoadingScreenDiv').style.display = 'none'
}
