require('file-loader?name=[name].[ext]!./index.html');
import GridEngine from "../grid-engine";
import Content from "../grid-engine/Content";
import Flu from "../grid-engine/Flu";
import Grid from "../grid-engine/Grid";
import { randomId } from "../grid-engine/Utils";
import Block from "./components/block";
import newBlock from "./components/block";

// let textElement = document.createElement("div");
// textElement.appendChild(document.createTextNode(gridEngine));
// document.body.appendChild(textElement);


let rootElement = document.getElementById("root");
var styleSheet = document.createElement("style")
if(!rootElement)
    rootElement = new HTMLElement();


const width = 20;
const height = 20;
let ge = new GridEngine(width,height,rootElement,styleSheet,{x:width,y:height});


let blocks:Block[][] = [];
for(let x = 0;x<width;x++){
    blocks[x] = new Array(height);
    for(let y = 0;y<height;y++){
        const selected = new Flu<boolean>(false);
        const area = ge.mainGrid.makeArea({x:x,y:y},{x:1,y:1},false,false);
        blocks[x][y] = new Block(selected,{x:x,y:y});
        area.setChild(blocks[x][y]);
    }
}






styleSheet.setAttribute("type","text/css")
document.head.appendChild(styleSheet)


if(rootElement)
    ge.render(rootElement,styleSheet);

// const testga = ge.mainGrid.makeArea({x:35,y:30},{x:10,y:30})
// const testgb = ge.mainGrid.makeArea({x:45,y:30},{x:15,y:10},true,true);
// const testgc = ge.mainGrid.makeArea({x:80,y:50},{x:10,y:10},false,false);
// const testgd = ge.mainGrid.makeArea({x:45,y:50},{x:15,y:10},false,true);

// const testFlu = new Flu<string>("hello world");
// const maker = (flus:Flu<string>[])=>{
//     const element = document.createElement("div");
//     element.style.height = "100%";
//     element.innerText = flus[0].get();
//     element.style.backgroundColor = "red";
//     return element
// }


// const testcontent = new Content(maker,[testFlu]);
// testga.setChild(testcontent);
// testgc.setChild(testcontent);

// const maker2 = (flus:Flu<string>[])=>{
//     const div = document.createElement("div");
//     div.style.backgroundColor = "lightgreen";
//     div.style.height = "100%";
//     const element = document.createElement("button");
//     element.innerText = "testbtn";
//     element.addEventListener("click",()=>{testFlu.set(randomId("test"))});
//     div.appendChild(element);
//     return div;
// }
// const testcontent2 = new Content(maker2,[]);
// testgb.setChild(testcontent2);
// testgd.setChild(testcontent2);