require('file-loader?name=[name].[ext]!./index.html');
import GridEngine from "../grid-engine";
import gridEngine from "../grid-engine"
import Text from "../grid-engine/Content/Text";

// let textElement = document.createElement("div");
// textElement.appendChild(document.createTextNode(gridEngine));
// document.body.appendChild(textElement);

let ge = new GridEngine(100,100);
const testa = ge.mainGrid.makeArea({x:5,y:5,z:0},{x:6,y:6})
const testA = ge.mainGrid.area({x:5,y:5,z:0});

testa.writeContent(new Text("test"));

let textElement = document.createElement("div");
textElement.appendChild(document.createTextNode(ge.render(100,100)));
document.body.appendChild(textElement);

