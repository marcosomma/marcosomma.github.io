import * as GUI from 'babylonjs-gui'


export const getGUILandingPage = (advancedTexture) => {
    let panelBorder = new GUI.StackPanel();
    panelBorder.zIndex = 10
    panelBorder.height = "232px";
    panelBorder.width = "232px";
    panelBorder.background = "black"
    panelBorder.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panelBorder.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    panelBorder.thickness = 0
    advancedTexture.addControl(panelBorder);
    let panel = new GUI.StackPanel();
    panel.zIndex = 20
    panel.height = "230px";
    panel.width = "230px";
    panel.background = "white"
    panel.fontFamily = "Roboto";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    panel.thickness = 0

    let header = new GUI.TextBlock();
    header.zIndex = 30
    header.text = "Marco Somma";
    header.color = "black";
    header.fontFamily = "Roboto";
    header.fontSize = 32
    header.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.paddingTop = 5;
    header.paddingLeft = 10;

    let btnCenterBrain = new GUI.TextBlock();
    btnCenterBrain.zIndex = 40
    btnCenterBrain.text = "Experiences";
    btnCenterBrain.color = "black";
    btnCenterBrain.fontFamily = "Roboto";
    btnCenterBrain.height = '3'
    btnCenterBrain.fontWeight = 100
    btnCenterBrain.fontSize = 24
    btnCenterBrain.paddingTop = 70
    btnCenterBrain.paddingRight = 10
    btnCenterBrain.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    btnCenterBrain.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT

    let btnLeftBrain = new GUI.TextBlock();
    btnLeftBrain.zIndex = 42
    btnLeftBrain.text = "Creativity";
    btnLeftBrain.color = "black";
    btnLeftBrain.fontFamily = "Roboto";
    btnLeftBrain.height = '3'
    btnLeftBrain.fontWeight = 100
    btnLeftBrain.fontSize = 24
    btnLeftBrain.paddingTop = 130
    btnLeftBrain.paddingRight = 10
    btnLeftBrain.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    btnLeftBrain.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT

    let btnRightBrain = new GUI.TextBlock();
    btnRightBrain.zIndex = 41
    btnRightBrain.text = "Programming";
    btnRightBrain.color = "black";
    btnRightBrain.fontFamily = "Roboto";
    btnRightBrain.height = '3'
    btnRightBrain.fontWeight = 100
    btnRightBrain.fontSize = 24
    btnRightBrain.paddingTop = 100
    btnRightBrain.paddingRight = 10
    btnRightBrain.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    btnRightBrain.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT

    let contacts = new GUI.TextBlock();
    contacts.zIndex = 43
    contacts.text = "marcosomma.work@gmail.com";
    contacts.color = "black";
    contacts.fontFamily = "Roboto";
    contacts.height = '3'
    contacts.fontWeight = 100
    contacts.fontSize = 12
    contacts.paddingTop = 200
    contacts.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    contacts.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    contacts.onPointerEnterObservable.add(() => {
        contacts.color = "#018786"
    });
    contacts.onPointerOutObservable.add(() => {
        contacts.color = "black"
    });

    panel.addControl(header);
    panel.addControl(btnCenterBrain);
    panel.addControl(btnRightBrain);
    panel.addControl(btnLeftBrain);
    panel.addControl(contacts);
    panelBorder.addControl(panel);

    return ({
        btnCenterBrain,
        btnLeftBrain,
        btnRightBrain,
    })
}