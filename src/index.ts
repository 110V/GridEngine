require('file-loader?name=[name].[ext]!./index.html');
import GridEngine from "../grid-engine";
import Grid from "../grid-engine/Grid";

// let textElement = document.createElement("div");
// textElement.appendChild(document.createTextNode(gridEngine));
// document.body.appendChild(textElement);

let ge = new GridEngine(100,100);
const testa = ge.mainGrid.makeArea({x:50,y:5,z:0},{x:10,y:6})
const testb = ge.mainGrid.makeArea({x:50,y:5,z:5},{x:30,y:30})

// testa.setChild(new Text("Basdfasdfs"));
// testb.setChild(new Grid({x:20,y:20}));
// const a = (testb.child as Grid).makeArea({x:9,y:9,z:0},{x:10,y:10});
// a.setChild(new Text("zzz"));



let rootElement = document.getElementById("root");

var styleSheet = document.createElement("style")

styleSheet.setAttribute("type","text/css")
document.head.appendChild(styleSheet)


if(rootElement)
    ge.render(rootElement,styleSheet);