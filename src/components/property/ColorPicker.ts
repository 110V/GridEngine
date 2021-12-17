import Content from "../../../grid-engine/Content";


export default class ColorPicker extends Content{
    constructor(name:string){//,value:Flu<boolean>){
        super(document.createElement("div"));
        this._htmlElement.className = "value-component"; 
        const element_colorPicker = document.createElement("input");
        element_colorPicker.type = "text"
        element_colorPicker.className = "color-btn coloris";
        element_colorPicker.value = "white"
        element_colorPicker.style.backgroundColor = "white"
        
        

        const element_name = document.createElement("div");
        element_name.className = "value-name"
        element_name.innerText = name;
        this._htmlElement.appendChild(element_name);
        this._htmlElement.appendChild(element_colorPicker);
        
    }
}