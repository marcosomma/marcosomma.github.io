import * as GUI from 'babylonjs-gui'

const getLabelParams = (fileName) => {
    let params = {}
    switch (fileName) {
        case 'CX':
            params.h = "180px"
            params.w = "950px"
            params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
            params.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
            break;
        case 'LX':
            params.h = "250px"
            params.w = "550px"
            params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
            params.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
            break;
        case 'RX':
            params.h = "350px"
            params.w = "550px"
            params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
            params.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_LEFT
            break;
        default:
            params.h = "350px"
            params.w = "550px"
            params.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
            params.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
    }
    return params
}

    export const getGUIBrainPart = (fileName ,importedBrainPart, advancedTexture) => 
        {
            let label = new GUI.Rectangle("label for " + importedBrainPart.name);
            let labelParams = getLabelParams(fileName)
            label.background = "#f1f1f1"
            label.height = labelParams.h
            label.width = labelParams.w
            label.verticalAlignment = labelParams.verticalAlignment
            label.horizontalAlignment = labelParams.horizontalAlignment 
            label.zIndex = 5   
            label.top = 80 
            label.paddingRight = 150 
            label.paddingLeft = 150 
            advancedTexture.addControl(label)

            let text1 = new GUI.TextBlock();
            text1.fontFamily = "Roboto";
            text1.fontWeight = 500
            text1.fontSize = 14
            text1.color = "black";
            text1.text = "Right Hemisphere:"
            text1.top = 5
            text1.left = 5
            text1.right = 5
            text1.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
            text1.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            let text2 = new GUI.TextBlock();
            text2.textWrapping = GUI.TextWrapping.WordWrap
            text2.fontFamily = "Roboto";
            text2.fontWeight = 100
            text2.fontSize = 12
            text2.color = "black";
            text2.text = "Responsible for control of the left side of the body, and is the more artistic and creative side of the brain. \nIt's also controlling, Art awareness, Creativity, Imgination, Insight, Holistic thought, Music awareness, 3-D forms and mush more..."
            text2.top = 30
            text2.left = 5
            text2.right = 5
            text2.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
            text2.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
            let cit = new GUI.TextBlock();
            cit.textWrapping = GUI.TextWrapping.WordWrap
            cit.fontFamily = "Roboto";
            cit.fontWeight = 100
            cit.fontSize = 9
            cit.color = "black";
            cit.text = "Logic will get you from A to B. Imagination will take you everywhere."
            cit.paddingBottomInPixels = 15
            cit.right = 5
            cit.left = 5
            cit.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
            cit.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
            let citAuth = new GUI.TextBlock();
            citAuth.textWrapping = GUI.TextWrapping.WordWrap
            citAuth.fontFamily = "Roboto";
            citAuth.fontWeight = 500
            citAuth.fontSize = 8
            citAuth.color = "black";
            citAuth.text = "cit. A.Einstein"
            citAuth.paddingRightInPixels = 15
            citAuth.right = 5
            citAuth.left = 5
            citAuth.top = -10
            citAuth.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
            citAuth.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
            label.addControl(text1); 
            label.addControl(text2); 
            label.addControl(cit); 
            label.addControl(citAuth); 
            
            let line = new GUI.Line();
            line.lineWidth = 0.5;
            line.dash = [5, 5];
            line.color = "black"
            advancedTexture.addControl(line); 
            line.linkWithMesh(importedBrainPart);
            line.connectedControl = label;
            
            let endRound = new GUI.Ellipse();
            endRound.width = "10px";
            endRound.background = "white";
            endRound.height = "10px";
            endRound.color = "black";
            advancedTexture.addControl(endRound);
            endRound.linkWithMesh(importedBrainPart);

            return ({
                label,
                line,
                endRound
            })
    }