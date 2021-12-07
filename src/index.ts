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

let ge = new GridEngine(100,100,rootElement,styleSheet,{x:500,y:500});
const testga = ge.mainGrid.makeArea({x:35,y:20},{x:10,y:10})
const testgb = ge.mainGrid.makeArea({x:45,y:22},{x:15,y:10},true,true);
const testgc = ge.mainGrid.makeArea({x:80,y:22},{x:10,y:10},false,false);

const testFlu = new Flu<string>("hello world");
const maker = (flus:Flu<string>[])=>{
    const element = document.createElement("div");
    element.style.height = "100%";
    element.innerText = flus[0].get();
    element.style.backgroundColor = "red";
    return element
}


const testcontent = new Content(maker,[testFlu]);
testga.setChild(testcontent);
testgc.setChild(testcontent);

const maker2 = (flus:Flu<string>[])=>{
    const div = document.createElement("div");
    div.style.backgroundColor = "blue";
    div.style.height = "100%";
    const element = document.createElement("button");
    element.innerText = "testbtn";
    element.addEventListener("click",()=>{testFlu.set(randomId("test"))});
    div.appendChild(element);
    return div;
}
const testcontent2 = new Content(maker2,[]);
testgb.setChild(testcontent2);




styleSheet.setAttribute("type","text/css")
document.head.appendChild(styleSheet)


if(rootElement)
    ge.render(rootElement,styleSheet);
