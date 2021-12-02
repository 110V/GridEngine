require('file-loader?name=[name].[ext]!./index.html');
import GridEngine from "../grid-engine";
import Content from "../grid-engine/Content";
import Flu from "../grid-engine/Flu";
import Grid from "../grid-engine/Grid";
import { randomId } from "../grid-engine/Utils";

// let textElement = document.createElement("div");
// textElement.appendChild(document.createTextNode(gridEngine));
// document.body.appendChild(textElement);


let rootElement = document.getElementById("root");
var styleSheet = document.createElement("style")
if(!rootElement)
    rootElement = new HTMLElement();

let ge = new GridEngine(100,100,rootElement,styleSheet);
const testga = ge.mainGrid.makeArea({x:50,y:5,z:0},{x:20,y:6})
const testgb = ge.mainGrid.makeArea({x:25,y:5,z:5},{x:30,y:30})


const testFlu = new Flu<string>("hello world");
const maker = (flus:Flu<string>[])=>{
    const element = document.createElement("div");
    element.innerText = flus[0].get();
    return element;
}
const testcontent = new Content(maker,[testFlu]);
testga.setChild(testcontent);


const maker2 = (flus:Flu<string>[])=>{
    const element = document.createElement("button");
    element.innerText = "testbtn";
    element.addEventListener("click",()=>{testFlu.set(randomId("test"))});
    return element;
}
const testcontent2 = new Content(maker2,[]);
testgb.setChild(testcontent2);




styleSheet.setAttribute("type","text/css")
document.head.appendChild(styleSheet)


if(rootElement)
    ge.render(rootElement,styleSheet);
