require('file-loader?name=[name].[ext]!./index.html');
import GridEngine from "../grid-engine";
import gridEngine from "../grid-engine"
import Text from "../grid-engine/Content/Text";
import Grid from "../grid-engine/Grid";

// let textElement = document.createElement("div");
// textElement.appendChild(document.createTextNode(gridEngine));
// document.body.appendChild(textElement);

let ge = new GridEngine(100,100);
const testa = ge.mainGrid.makeArea({x:50,y:5,z:0},{x:10,y:6})
const testb = ge.mainGrid.makeArea({x:5,y:5,z:0},{x:30,y:30})

testa.setChild(new Text("B"));
testb.setChild(new Grid({x:20,y:20}));
const a = (testb.child as Grid).makeArea({x:9,y:9,z:0},{x:10,y:10});
a.setChild(new Text("zzz"));
const result:{html:string,css:string} = JSON.parse(ge.render(100,100));


let rootElement = document.getElementById("root");

if(rootElement)
    rootElement.innerHTML += result.html;


var styleSheet = document.createElement("style")

styleSheet.setAttribute("type","text/css")
console.log(result.css)
styleSheet.innerHTML = result.css;
document.head.appendChild(styleSheet)
