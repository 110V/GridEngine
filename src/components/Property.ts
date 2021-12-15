import Content from "../../grid-engine/Content";
import Grid from "../../grid-engine/Grid";

enum InputType{

}

interface PropertyValue<T>{
    name:string,
    value:T,
    inputType:InputType,
}


export default class PropertyEdit extends Grid {
    private propertysize = {x:2,y:1};
    private _name:string;
    private _values:PropertyValue<any>[];

    constructor(name:string,values:PropertyValue<any>[]) {
        super({x:2,y:values.length+1});
        this._name = name;
        this._values = values;
    }; 
    
    private Init(){
        this.makeArea({x:0,y:0},this.propertysize);
        this._values.forEach((v,i)=>{
            const nameArea = this.makeArea({x:0,y:i+1},{x:1,y:1});
            const valueArea = this.makeArea({x:0,y:i+1},{x:1,y:1});
            //name
            const nameElement = document.createElement("div");
            nameElement.className = "value_name";
            nameElement.innerText = v.name;
            const nameContent = new Content(nameElement);
            nameArea.setChild(nameContent);
        })
        
    }

}