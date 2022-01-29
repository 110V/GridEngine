import Content from "../../../grid-engine/Content";
import Bridge from "../../../grid-engine/Bridge";



export default class ColorPicker extends Content{
    constructor(id:string,name:string,ouputLogicName:string,bridge:Bridge){
        super(document.createElement("div"));
        this._htmlElement.className = "value-component"; 
        const element_colorPicker = document.createElement("input");
        element_colorPicker.type = "text"
        element_colorPicker.className = "color-btn coloris";
        element_colorPicker.value = "white"
        


        element_colorPicker.addEventListener("change",(v)=>{
            bridge.runLogic(ouputLogicName,element_colorPicker.value);
        })

        const element_name = document.createElement("div");
        element_name.className = "value-name"
        element_name.innerText = name;
        this._htmlElement.appendChild(element_name);
        this._htmlElement.appendChild(element_colorPicker);
        
    }
}