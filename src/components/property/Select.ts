import Content from "../../../grid-engine/Content";
import Grid from "../../../grid-engine/Grid";

export default class Select extends Content{
    constructor(name:string){//,value:Flu<boolean>){
        super(document.createElement("div"));
        this._htmlElement.className = "value-component"; 
        const dropdown = document.createElement("div");
        dropdown.className = "ui dropdown icon";
        const element_name = document.createElement("div");
        element_name.className = "value-name"
        this._htmlElement.innerText = name;
        this._htmlElement.appendChild(element_name);

        dropdown.innerHTML+=`
        <input type="hidden" name="gender" value="1">
        <i class="dropdown icon"></i>
        <div class="default text">Gender</div>
        <div class="menu">
          <div class="item" data-value="1">다</div>
          <div class="item" data-value="0">덤벼</div>
        </div>`;
        this._htmlElement.appendChild(dropdown);
        
    }
}