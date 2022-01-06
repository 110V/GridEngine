import Content from "../../../grid-engine/Content";
import Grid from "../../../grid-engine/Grid";

export default class CheckboxInput extends Content{
    constructor(id:string,name:string,logicName:string){
        super(document.createElement("div"));
        const container = document.createElement("label")
        container.className = "checkbox-container value-component";
        const element_input = document.createElement("input");

        element_input.addEventListener("change",(v)=>{
            
        })
        
        element_input.type = "checkbox";
        container.appendChild(element_input);
        
        const element_checkbox = document.createElement("span");
        container.appendChild(element_checkbox);
        const element_name = document.createElement("div");
        element_name.innerText = name;
        container.appendChild(element_name);
        this._htmlElement.appendChild(container);
    }
}