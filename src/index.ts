require('file-loader?name=[name].[ext]!./index.html');
import gridEngine from "../grid-engine"

let textElement = document.createElement("div");
textElement.appendChild(document.createTextNode(gridEngine));
document.body.appendChild(textElement);
