import * as GUI from 'babylonjs-gui'

export const getGUILandingPage = (advancedTexture) => {
    let panelBorder = new GUI.StackPanel();
    panelBorder.zIndex = 10
    panelBorder.height = "282px";
    panelBorder.width = "282px";
    panelBorder.background = "black"
    panelBorder.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panelBorder.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    panelBorder.thickness = 0
    advancedTexture.addControl(panelBorder);
    
    let panel = new GUI.StackPanel();
    panel.zIndex = 20
    panel.height = "280px";
    panel.width = "280px";
    panel.background = "white"
    panel.fontFamily = "Roboto";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    panel.thickness = 0

    let preHeader = new GUI.TextBlock();
    preHeader.zIndex = 30
    preHeader.text = "Welcome to";
    preHeader.color = "black";
    preHeader.fontFamily = "Roboto";
    preHeader.fontWeight = 100
    preHeader.fontSize = 32
    preHeader.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    preHeader.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    preHeader.paddingTop = 5;
    preHeader.paddingRight = 10;

    let header = new GUI.TextBlock();
    header.zIndex = 31
    header.text = "Marco's brain";
    header.color = "black";
    header.fontFamily = "Roboto";
    header.fontSize = 32
    header.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.paddingTop = 40;
    header.paddingLeft = 10;

    let btnCenterBrain = new GUI.Button.CreateSimpleButton('menu-Experiences',"Experiences");
    btnCenterBrain.zIndex = 40
    btnCenterBrain.color = "black";
    btnCenterBrain.fontFamily = "Roboto";
    btnCenterBrain.fontWeight = 100
    btnCenterBrain.fontSize = 24
    btnCenterBrain.paddingTop = 105
    btnCenterBrain.paddingBottom = 135
    btnCenterBrain.paddingLeft = 130
    btnCenterBrain.paddingRight = 0
    btnCenterBrain.thickness = 0

    let btnRightBrain = new GUI.Button.CreateSimpleButton('menu-Programming',"Programming");
    btnRightBrain.zIndex = 40
    btnRightBrain.color = "black";
    btnRightBrain.fontFamily = "Roboto";
    btnRightBrain.fontWeight = 100
    btnRightBrain.fontSize = 24
    btnRightBrain.paddingTop = 135
    btnRightBrain.paddingBottom = 105
    btnRightBrain.paddingLeft = 115
    btnRightBrain.paddingRight = 0
    btnRightBrain.thickness = 0

    let btnLeftBrain = new GUI.Button.CreateSimpleButton('menu-Creativity',"Creativity");
    btnLeftBrain.zIndex = 40
    btnLeftBrain.color = "black";
    btnLeftBrain.fontFamily = "Roboto";
    btnLeftBrain.fontWeight = 100
    btnLeftBrain.fontSize = 24
    btnLeftBrain.paddingTop = 165
    btnLeftBrain.paddingBottom = 75
    btnLeftBrain.paddingLeft = 155
    btnLeftBrain.paddingRight = 0
    btnLeftBrain.thickness = 0

    let contacts = new GUI.TextBlock();
    contacts.zIndex = 43
    contacts.text = "marcosomma.work@gmail.com";
    contacts.color = "black";
    contacts.fontFamily = "Roboto";
    contacts.height = '3'
    contacts.fontWeight = 100
    contacts.fontSize = 12
    contacts.paddingTop = 260
    contacts.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    contacts.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    contacts.onPointerEnterObservable.add(() => {
        contacts.color = "#018786"
    });
    contacts.onPointerOutObservable.add(() => {
        contacts.color = "black"
    });

    panel.addControl(preHeader);
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