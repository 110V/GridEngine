import Content from "../../../grid-engine/Content";
import Grid from "../../../grid-engine/Grid";
import Checkbox from "./Checkbox";
import NumberInput from "./NumberInput";

enum InputType{
    number,
}

interface PropertyValue<T>{
    name:string,
    value:T,
    inputType:InputType,
}


class PropertyEdit extends Grid {
    private propertysize = {x:2,y:1};
    private _name:string;
    private _values:PropertyValue<any>[];

    constructor(name:string,values:PropertyValue<any>[]) {
        super({x:2,y:values.length+1});
        this._name = name;
        this._values = values;
        this.Init();
    }; 
    
    private Init(){
        const area_propertyName = this.makeArea({x:0,y:0},this.propertysize);
        const element_area = document.createElement("div");
        element_area.innerText = this._name;
        area_propertyName.setChild(new Content(element_area));
        const nameArea = this.makeArea({x:0,y:0+1},{x:2,y:1});
        nameArea.setChild(new Checkbox("test"));
        const nameArea2 = this.makeArea({x:0,y:1+1},{x:2,y:1});
        nameArea2.setChild(new NumberInput("height"));
        this._values.forEach((v,i)=>{

            // const valueArea = this.makeArea({x:1,y:i+1},{x:1,y:1});
            // //name
            // const nameElement = document.createElement("div");
            // nameElement.className = "value_name";
            // nameElement.innerText = v.name;
            // const nameContent = new Content(nameElement);
            // nameArea.setChild(nameContent);
            // //value
            // const valueElement = document.createElement("input");
            // valueElement.className = "value_name";
            // valueElement.innerText = v.name;
            // const valueContent = new Content(valueElement);
            // valueArea.setChild(valueContent);
        });
    }

}


export {InputType,PropertyEdit,PropertyValue};