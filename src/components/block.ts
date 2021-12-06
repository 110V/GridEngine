import Flu from "../../grid-engine/Flu";

const maker = (flus:Flu<string>[])=>{
    const element = document.createElement("div");
    element.innerText = flus[0].get();
    return element;
}