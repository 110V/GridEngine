require('file-loader?name=[name].[ext]!./index.html');
require('file-loader?name=[name].[ext]!./index.css');
import GridEngine from "../grid-engine";
import Content from "../grid-engine/Content/Content";
import Grid from "../grid-engine/Grid";
import { randomId } from "../grid-engine/Utils";
import { PropertyEdit,InputType} from "./components/property/Property";
import Coloris from "@melloware/coloris"
import { CssEditor } from "./components/CssEditor";
import {GridEditor} from "./components/GridEditor";
require('file-loader?name=[name].[ext]!@melloware/coloris/dist/coloris.css');

import { globalVarClass } from "./GlobalStyles.css";


const init = () => {

    const styleSheet = document.createElement("style");
    const root = document.getElementById("root");

    if(!root){
        return;
    }
    root.className = globalVarClass;


    const gridEngine = new GridEngine(20, 25, root, styleSheet, { x: 1920, y: 1080 });
    const grid_main  = gridEngine.mainGrid;
    
    const area_menu = grid_main.makeArea({x:0,y:0},{x:20,y:1},false,true,"menu");
    const grid_menu = new Grid({x:25,y:1})
    area_menu.setChild(grid_menu);
    const area_filebtn = grid_menu.makeArea({x:0,y:0},{x:1,y:1},true,false);
    grid_menu.makeArea({x:10,y:0},{x:1,y:1},true,false);//dummmy
    const area_title = grid_menu.makeArea({x:1,y:0},{x:25-2,y:1},false,false);
    const element_title = document.createElement("div");
   // const content_title = new Content(element_title,"title");
    //area_title.setChild(content_title);
    const element_button = document.createElement("button");
    element_button.className = "color-grid-button";
    element_button.innerText = "File";
    //const content_filebtn = new Content(element_button,"filebtn");
    //area_filebtn.setChild(content_filebtn);

    const area_htmlEditor = grid_main.makeArea({x:17,y:1},{x:3,y:24},true,false);
   // const content = new Content(document.createElement("div"),"html_editor");
   // area_htmlEditor.setChild(content);
    gridEngine.bridge.createLogic("alert",true,true,(_,value)=>{
        alert(value);
        return null;
    })
    gridEngine.bridge.createLogic("css_border_color_setter",true,false,(_,color)=>{
        
        return {name:"alert",value:color};
    })
    
    const grid_cssEditor = new CssEditor(gridEngine.bridge);

    area_htmlEditor.setChild(grid_cssEditor);

    const grid_GridEditor = new GridEditor(gridEngine.bridge,{x:50,y:50});
    const area_GridEditor = grid_main.makeArea({x:0,y:1},{x:16.5,y:20},false,true,"GridEditor");
    area_GridEditor.setChild(grid_GridEditor);
    gridEngine.render();
    

    Coloris({el: ".coloris"});
    Coloris.init();
    Coloris.close();
}


init();


// // let textElement = document.createElement("div");
// // textElement.appendChild(document.createTextNode(gridEngine));
// // document.body.appendChild(textElement);


// let rootElement = document.getElementById("root");
// var styleSheet = document.createElement("style")
// if(!rootElement)
//     rootElement = new HTMLElement();


// const width = 50;
// const height = 50;
// let ge = new GridEngine(width, height, rootElement, styleSheet, { x: width, y: height });


// let blocks: Block[][] = [];
// for (let x = 0; x < width; x++) {
//     blocks[x] = new Array(height);
//     for (let y = 0; y < height; y++) {
//         const selected = new Flu<boolean>(false);
//         const area = ge.mainGrid.makeArea({ x: x, y: y }, { x: 1, y: 1 }, false, false);
//         blocks[x][y] = new Block(selected, { x: x, y: y });
//         area.setChild(blocks[x][y]);
//     }
// }




// styleSheet.setAttribute("type","text/css")
// document.head.appendChild(styleSheet)


// if(rootElement)
//     ge.render(rootElement,styleSheet);

// // const testga = ge.mainGrid.makeArea({x:35,y:30},{x:10,y:30})
// // const testgb = ge.mainGrid.makeArea({x:45,y:30},{x:15,y:10},true,true);
// // const testgc = ge.mainGrid.makeArea({x:80,y:50},{x:10,y:10},false,false);
// // const testgd = ge.mainGrid.makeArea({x:45,y:50},{x:15,y:10},false,true);

// // const testFlu = new Flu<string>("hello world");
// // const maker = (flus:Flu<string>[])=>{
// //     const element = document.createElement("div");
// //     element.style.height = "100%";
// //     element.innerText = flus[0].get();
// //     element.style.backgroundColor = "red";
// //     return element
// // }


// // const testcontent = new Content(maker,[testFlu]);
// // testga.setChild(testcontent);
// // testgc.setChild(testcontent);

// // const maker2 = (flus:Flu<string>[])=>{
// //     const div = document.createElement("div");
// //     div.style.backgroundColor = "lightgreen";
// //     div.style.height = "100%";
// //     const element = document.createElement("button");
// //     element.innerText = "testbtn";
// //     element.addEventListener("click",()=>{testFlu.set(randomId("test"))});
// //     div.appendChild(element);
// //     return div;
// // }
// // const testcontent2 = new Content(maker2,[]);
// // testgb.setChild(testcontent2);
// // testgd.setChild(testcontent2);

