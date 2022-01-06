import Content from "../../../grid-engine/Content";
import Grid from "../../../grid-engine/Grid";

export default class TextInput extends Content {
    constructor(name: string) {
        super(document.createElement("div"));
        const element_name = document.createElement("div");
        this._htmlElement.className = "numberinput-container value-component";
        element_name.innerText = name;
        element_name.className = "numberinput-name";
        this._htmlElement.appendChild(element_name);
        const element_input = document.createElement("input");

        element_input.addEventListener("change",()=>{
            //value.set(element_input.value);
        })
        
        element_input.type = "text";
        element_input.className = "numberinput-input"
        this._htmlElement.appendChild(element_input);
        
    }
}